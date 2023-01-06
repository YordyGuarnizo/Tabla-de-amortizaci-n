// const buton = document.querySelector('.button');
// buton.addEventListener('click', function (e) {
//   e.preventDefault();

//   const data = +document.querySelector('.prueba').value;
//   console.log(data);
// });

const buttonInt = document.querySelector('.button2');
const selector = document.querySelector('.select-prueba');
const intRate = document.querySelector('.interest');

const calcInt = function (interest) {
  const decimalInt = interest / 100;
  return decimalInt;
};

const calcAnualidad = function (amount, perInt, nper) {
  const int = calcInt(perInt);
  console.log(int);

  return Math.round(amount / ((1 - Math.pow(1 + int, -nper)) / int));
};

let intrepentino;
let cuota;

buttonInt.addEventListener('click', function (e) {
  e.preventDefault();

  //Calcular interes
  const data = selector.options[selector.selectedIndex].text;
  const interest = +intRate.value;

  if (data === 'Mensual') {
    intrepentino = interest / 12;
    cuota = calcAnualidad(2000000, intrepentino, 6);
    console.log(cuota);
  }

  if (data === 'Bimestral') {
    intrepentino = interest / 6;
    cuota = calcAnualidad(2000000, intrepentino, 6);
    console.log(cuota);
  }
});
