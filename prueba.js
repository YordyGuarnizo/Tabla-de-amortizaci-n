//Todo esto es una prueba

//Selectores necesarios
const buttonInt = document.querySelector('.button2');
const selector = document.querySelector('.select-prueba');
const intRate = document.querySelector('.interest');
const insertarHtml = document.querySelector('.insertar');
const insertarTabla = document.querySelector('.table--amort');

//Variable global
let cuota;

//Función para calcular la tasa de interes desde un numero entero en el input
const calcInt = function (interest) {
  const decimalInt = interest / 100;
  const data = selector.options[selector.selectedIndex].text;

  if (data === 'Mensual') return decimalInt / 12;
  if (data === 'Bimestral') return decimalInt / 6;
};

//Calcular la anualidad (cuota)
const calcAnualidad = function (amount, perInt, nper) {
  const int = calcInt(perInt);
  console.log(int);
  return (cuota = Math.round(amount / ((1 - Math.pow(1 + int, -nper)) / int)));
};

//Poner HTML

//Ejecutarse todo con el evento
// buttonInt.addEventListener('click', function (e) {
//   e.preventDefault();
//   const data = +intRate.value;
//   calcAnualidad(2000000, data, 6);
//   console.log(cuota);

//   front();
// });

//Para hacer las tablas
cuota = calcAnualidad(2000000, 60, 6);
console.log(cuota);

let numero = 6;
let interest = 0;
let amort = 0;

const tabla = new Map();
tabla.set(0, { pago: 0, interes: 0, amortizacion: 0, saldo: 2000000 });

let sald = tabla.get(0).saldo;

for (let i = 0; i < numero; i++) {
  tabla.set(i + 1, {
    pago: cuota,
    interes: (interest = Math.trunc(Math.round(0.05 * sald))),
    amortizacion: (amort = Math.trunc(Math.round(cuota - interest))),
    saldo: (sald = Math.trunc(Math.round(sald - amort))),
  });
}

console.log(tabla);

for (const [key, { pago, interes, amortizacion, saldo }] of tabla) {
  console.log(
    `el pago en el periodo ${key}, es de ${pago} con un interes de ${interes}, una amortizacion de ${amortizacion} y un saldo de ${saldo}`
  );
}

// const front = function () {
//   const htmlInit = `
//   <h4 class="legend">
//   El valor de la cuota con un credito de 2000000, una tasa de interes al
//   ${Math.round(calcInt(+intRate.value))}% ${
//     selector.options[selector.selectedIndex].text
//   } efectivo y a 8 periodos es de $${cuota}
//     </h4>

//     <table class="table--amort">
//      <tr>
//       <th>No.</th>
//       <th>Cuota</th>
//       <th>Interes</th>
//       <th>Amortización</th>
//       <th>Saldo</th>
//     </tr>
//      <tr>
//             <td>0</td>
//             <td></td>
//             <td></td>
//             <td></td>
//             <td>${sald}</td>
//      </tr>
//           </table>`;

//   insertarHtml.insertAdjacentHTML('beforeend', htmlInit);
// };

const legend = function () {
  const html = `
  <h4 class="legend">
    El valor de la cuota con un credito de ${
      tabla.get(0).saldo
    }, una tasa de interes al
    ${Math.round(0.05 * 100)}% ${
    selector.options[selector.selectedIndex].text
  } efectivo y a 8 periodos es de $${cuota}
  </h4>`;

  insertarHtml.insertAdjacentHTML('afterend', html);
};

legend();

const tablaEncabezado = function () {
  const html = `
  <tr>
            <th>No.</th>
            <th>Cuota</th>
            <th>Interes</th>
            <th>Amortización</th>
            <th>Saldo</th>
  </tr>`;
  insertarTabla.insertAdjacentHTML('beforeend', html);
};

tablaEncabezado();

const tablesValues = function () {
  for (const [key, { pago, interes, amortizacion, saldo }] of tabla) {
    let dataTabla = `
  <tr>
    <td>${key}</td>
    <td>${pago}</td>
    <td>${interes}</td>
    <td>${amortizacion}</td>
    <td>${saldo}</td>
  </tr>
    `;
    insertarTabla.insertAdjacentHTML('beforeend', dataTabla);
  }
};

tablesValues();

console.log(insertarTabla);
