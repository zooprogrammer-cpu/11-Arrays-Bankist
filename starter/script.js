// 'use strict';

// /////////////////////////////////////////////////

// forEach on Map
const currencies = new Map([
  ['USD', 'United States Dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound Sterling']
]);


currencies.forEach((value, key, map)=>{
  console.log(`${key} : ${value}`);
})

//forEach on Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD']);
console.log(currenciesUnique);
currenciesUnique.forEach((value, _, map)=>{
  console.log(`${value}`);
})







