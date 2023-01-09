//----------------------------------------------------- ELEMENTS TO USE -------------------------------------------------------------------------
//Elements of form
const restart = document.querySelector('.new--credit');
const btnRestart = document.querySelector('.btn--credit');
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
const divContainerTable = document.querySelector('.container--amort');

//-------------------------------------------------------- FIRST PART ----------------------------------------------------------------------------

//Hiding button of restart
restart.classList.add('hidden');

//Global variable for periodicity payment
let nPayment;
let realInt;

//Calculating the interest rate in decimal numbers for the operation
const calcInt = function (interest) {
  const perData = periodicity.options[periodicity.selectedIndex].text;

  if (perData === 'Mensual') return interest / 12;
  if (perData === 'Bimestral') return interest / 6;
  if (perData === 'Trimestral') return interest / 4;
  if (perData === 'Cuatrimestral') return interest / 3;
  if (perData === 'Semestral') return interest / 2;
  if (perData === 'Anual') return interest;
};

//Calculating the periods payment
const calcPayment = function (amount, perInt, nper) {
  realInt = +calcInt(perInt / 100).toFixed(2);

  return (nPayment = amount / ((1 - Math.pow(1 + realInt, -nper)) / realInt));
};

//----------------------------------------------------- SECOND PART -----------------------------------------------------------------------------

//Global variables for the map (Data structure)
let interest = 0;
let amort = 0;

//Creating new Map
const amortTable = new Map();

//Setting the map
const mapSet = function (amount, nper) {
  //First period
  amortTable.set(0, {
    pago: 0,
    interes: 0,
    amortizacion: 0,
    saldo: amount,
  });

  //Local variable for balance
  let firstBalance = amortTable.get(0).saldo;

  //Itineration for setting the rest of the table according to number of periods
  for (let i = 0; i < nper; i++) {
    amortTable.set(i + 1, {
      pago: nPayment,
      interes: (interest = realInt * firstBalance),
      amortizacion: (amort = nPayment - interest),
      saldo: (firstBalance = firstBalance - amort),
    });
  }
};

//Put the numbers in locale format
const localNumbers = function (number) {
  return Intl.NumberFormat().format(number);
};

//Putting the HTML in the page
const htmlLegend = function (amount, nper) {
  const html = `
  <h4 class="legend">
    El valor de la cuota con un credito de $${localNumbers(
      amount
    )}, una tasa de interes al
    ${(realInt * 100).toFixed()}% ${
    periodicity.options[periodicity.selectedIndex].text
  } efectivo y a ${nper} periodos es de $${localNumbers(nPayment.toFixed())}
  </h4>
  `;

  divText.insertAdjacentHTML('beforeend', html);
};

const tableCreator = function (map) {
  const html = `
  <table class="table--amort"
   <tr>
            <th>No.</th>
            <th>Cuota</th>
            <th>Interes</th>
            <th>Amortización</th>
            <th>Saldo</th>
   </tr>
   </table>`;

  divContainerTable.insertAdjacentHTML('beforeend', html);
  const divTable = document.querySelector('.table--amort');

  for (const [key, { pago, interes, amortizacion, saldo }] of map) {
    let dataTabla = `
      <tr>
        <td>$${key}</td>
        <td>$${localNumbers(pago.toFixed())}</td>
        <td>$${localNumbers(interes.toFixed())}</td>
        <td>$${localNumbers(amortizacion.toFixed())}</td>
        <td>$${localNumbers(saldo.toFixed())}</td>
      </tr>
        `;
    divTable.insertAdjacentHTML('beforeend', dataTabla);
  }
};

//--------------------------------------------------------- EXECUTION --------------------------------------------------------------------------

btnSubmit.addEventListener('click', function (e) {
  //Validation of information
  if (amount.value.length === 0) {
    alert('Introduzca un valor de prestamo');
    return;
  } else if (intRate.value.length === 0) {
    alert('Introduzca una tasa de interes');
    return;
  } else if (
    periodicity.options[periodicity.selectedIndex].value === 'inicial'
  ) {
    alert('Seleccione un tipo de periodicidad');
    return;
  } else if (periodsNumber.value.length === 0) {
    alert('Introduzca un no. de periodos');
    return;
  } else {
    //App's execution

    e.preventDefault();
    //Changing the title
    header.textContent = 'Tabla de amortizacion';

    //Hiding the form
    formulary.classList.add('hidden');

    //Showing the restart button
    restart.classList.remove('hidden');

    //Get the input values
    const amountValue = +amount.value;
    const intRateValue = +intRate.value;
    const periodsNumberValue = +periodsNumber.value;

    //Calculating the n payemnt
    calcPayment(amountValue, intRateValue, periodsNumberValue);

    //Execute the legend
    htmlLegend(amountValue, periodsNumberValue);

    //Setting the map
    mapSet(amountValue, periodsNumberValue);

    //Execute the table with the map
    tableCreator(amortTable);
  }
});

btnRestart.addEventListener('click', function () {
  //Hidding the restart button
  restart.classList.add('hidden');

  //Showing the formulary
  formulary.classList.remove('hidden');

  //Removing the legend
  divText.removeChild(document.querySelector('.legend'));

  //Removing the table
  divContainerTable.removeChild(document.querySelector('.table--amort'));

  //Clear the map
  amortTable.clear();

  //Put all options in blank
  amount.value = '';
  intRate.value = '';
  periodicity.value = 'inicial';
  periodsNumber.value = '';
});
