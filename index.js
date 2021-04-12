function calculateImcAPI(person) {
  var data = {
    'height': person.height,
    'weight': person.weight
  }
  fetch('http://localhost:8080/imc/calculate', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(function(res){ return res.json() })
  .then(function(data){ renderImc(data) })
}

function renderImc(person) {
  document.getElementById('imc').innerHTML = parseFloat(person.imc).toFixed(2) + ' ' + person.imcDescription;
}

function Person(height, weight) {
  if (typeof(height) !== 'number' || isNaN(height))
    throw Error('height is not a number!');

  if (typeof(weight) !== 'number' || isNaN(weight))
    throw Error('weight is not a number!');

  this.height = height;
  this.weight = weight;
}

function Dietician(height, weight) {
  Person.call(this, height, weight);
}

Dietician.prototype = Object.create(Person.prototype);
Dietician.prototype.constructor = Dietician;
console.log(Dietician.prototype.constructor);

function calculateImc(dietician) {
  console.log('dietician is a person?');
  console.log(dietician instanceof Person);

  calculateImcAPI(dietician);
}

function buildCalculateImc() {
  var heightEl = document.getElementById('altura');
  var weightEl = document.getElementById('peso');

  return function(evt) {
    calculateImc(new Dietician(parseFloat(heightEl.value), parseFloat(weightEl.value)));
  }
}

function imcTableApi() {
  fetch('http://localhost:8080/imc/table', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(function(res){ return res.json() })
  .then(function(data){ renderTableImc(data) })
}

function renderTableImc(data) {
  const keys = Object.keys(data)
  var tableHTML = ''

  keys.forEach((key, index) => {
    tableHTML += `<tr>
      <td>${key}</td>
      <td>${data[key]}</td>
    </tr>`
  })
  document.getElementById('tabela-imc').innerHTML = tableHTML
}

window.onload = function() {
  var btn = document.querySelector('.data .form button');
  btn.addEventListener('click', buildCalculateImc());
  imcTableApi()
}
