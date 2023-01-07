//------------------------- ELEMENTS TO USE ---------------------------
//Elements of form
const btnSubmit = document.querySelector('.label--submit');
const formulary = document.querySelector('.box');

//Elements of value
const amount = document.querySelector('.label--amount');
const intRate = document.querySelector('.label--nint');
const periodicity = document.querySelector('.label--per');
const periodsNumber = document.querySelector('.label--nper');

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

//--------------------------- EXECUTION ------------------------------
btnSubmit.addEventListener('click', function (e) {
  e.preventDefault();

  //Hiding the form
  formulary.style.display = 'none';

  const amountValue = +amount.value;
  const intRateValue = +intRate.value;
  const periodsNumberValue = +periodsNumber.value;

  //Calculating the n payemnt
  calcPayment(amountValue, intRateValue, periodsNumberValue);
  console.log(nPayment);

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

  console.log(amortTable);
  console.log(interest);
});
