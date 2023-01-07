//------------------------- ELEMENTS TO USE ---------------------------
//Elements of form
const btnSubmit = document.querySelector('.label--submit');
const formulary = document.querySelector('.box');

//Elements of value
const amount = document.querySelector('.label--amount');
const intRate = document.querySelector('.label--nint');
const periodicity = document.querySelector('.label--per');
const periodsNumber = document.querySelector('.label--nper');
const header = document.querySelector('.title');

//Elements to insert
const divText = document.querySelector('.text');
const divTable = document.querySelector('.table--amort');

//--------------------------- FIRST PART ------------------------------
//Global variable for periodicity payment
let nPayment;
let realInt;

//Calculating the interest rate in decimal numbers for the operation
const calcInt = function (interest) {
  const decimalInt = interest / 100;
  const perData = periodicity.options[periodicity.selectedIndex].text;

  if (perData === 'Mensual') return decimalInt / 12;
  if (perData === 'Bimestral') return decimalInt / 6;
  if (perData === 'Trimestral') return decimalInt / 4;
  if (perData === 'Cuatrimestral') return decimalInt / 3;
  if (perData === 'Semestral') return decimalInt / 2;
  if (perData === 'Anual') return decimalInt;
};

//Calculating the periods payment
const calcPayment = function (amount, perInt, nper) {
  realInt = calcInt(perInt);
  console.log(realInt);
  return (nPayment = Math.round(
    amount / ((1 - Math.pow(1 + realInt, -nper)) / realInt)
  ));
};

//--------------------------- SECOND PART ----------------------------

//Global variables for the map (Data structure)
let interest = 0;
let amort = 0;

//Creating new Map
const amortTable = new Map();

//Putting the HTML in the page
const htmlLegend = function (amount, nper) {
  const html = `
  <h4 class="legend">
    El valor de la cuota con un credito de $${amount}, una tasa de interes al
    ${realInt * 100}% ${
    periodicity.options[periodicity.selectedIndex].text
  } efectivo y a ${nper} periodos es de $${nPayment}
  </h4>`;

  divText.insertAdjacentHTML('beforeend', html);
};

const headTable = function () {
  const html = `
  <tr>
            <th>No.</th>
            <th>Cuota</th>
            <th>Interes</th>
            <th>Amortización</th>
            <th>Saldo</th>
  </tr>`;

  divTable.insertAdjacentHTML('beforeend', html);
};

const tablesValues = function (map) {
  for (const [key, { pago, interes, amortizacion, saldo }] of map) {
    let dataTabla = `
  <tr>
    <td>${key}</td>
    <td>${pago}</td>
    <td>${interes}</td>
    <td>${amortizacion}</td>
    <td>${saldo}</td>
  </tr>
    `;
    divTable.insertAdjacentHTML('beforeend', dataTabla);
  }
};

//--------------------------- EXECUTION ------------------------------
btnSubmit.addEventListener('click', function (e) {
  e.preventDefault();

  //Changing the title
  header.textContent = 'Tabla de amortizacion';

  //Hiding the form
  formulary.style.display = 'none';

  const amountValue = +amount.value;
  const intRateValue = +intRate.value;
  const periodsNumberValue = +periodsNumber.value;

  //Calculating the n payemnt
  calcPayment(amountValue, intRateValue, periodsNumberValue);
  console.log(nPayment);

  //Execute the legend
  htmlLegend(amountValue, periodsNumberValue);

  //////////Setting the map
  //First period
  amortTable.set(0, {
    pago: 0,
    interes: 0,
    amortizacion: 0,
    saldo: amountValue,
  });

  //Global variable for balance
  let firstBalance = amortTable.get(0).saldo;

  //Itineration for setting the rest of the table according to number of periods
  for (let i = 0; i < periodsNumberValue; i++) {
    amortTable.set(i + 1, {
      pago: nPayment,
      interes: (interest = Math.trunc(Math.round(realInt * firstBalance))),
      amortizacion: (amort = Math.trunc(Math.round(nPayment - interest))),
      saldo: (firstBalance = Math.trunc(Math.round(firstBalance - amort))),
    });
  }

  //Execute the table with the map
  headTable();
  tablesValues(amortTable);
});
