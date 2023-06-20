// 'use strict';
// /////////////////////////////////////////////////
//
// BANKIST APP
/////////////////////////////////////////////////
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; //Empty the containerMovemnts and the add new elements
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1
      } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

// Sum all balance using reduce 
const calcDisplayBalance = (movements) => {
  const balance = movements.reduce((acc, mov) => {
    return acc + mov
  }, 0);
  labelBalance.textContent = `${balance} €`;

};
calcDisplayBalance(account1.movements);

// Sum only the income and out using filter and reduce
const calcDisplaySummary = (movements) => {
  const incomes = movements.filter(mov=> mov > 0)    
  .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent =`${incomes}€`;

  const out = movements.filter(mov=> mov < 0)
  .reduce((acc,mov) =>acc +mov, 0);
  labelSumOut.textContent =`${Math.abs(out)}€`;

  const interest = movements.filter(mov=> mov >0)
  .map(deposit => deposit * 1.2/100)
  .filter((int, i, arr)=> {
    console.log(arr);
    return int >= 1; // give interest on only 1
  })
  .reduce((acc,int) =>acc + int, 0);
  labelSumInterest.textContent =`${interest}€`;

};

calcDisplaySummary(account1.movements);

// Adds a username property to each account without using push or add
// used forEach to have "side-effects" without returning anything, just did some work
const createUsernames = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

//////////////////////////////////////
// Coding Challenge #2


// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
const dogAges1 = [5, 2, 4, 1, 15, 8, 3];
const dogAges2 = [16, 6, 10, 5, 6, 1, 4];
const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => {
    return age <= 2 ? age * 2 : (16 + age * 4);
  })
  const adults = humanAges.filter((age)=>{
    return age > 18
  })
  console.log(humanAges);
  console.log(adults);
  const average = adults.reduce((acc, age)=>{
    return (acc + age);
  },0) / adults.length
  return average; 
}

console.log(calcAverageHumanAge(dogAges1));
console.log(calcAverageHumanAge(dogAges2));

// Chaining Methods
const movements =  [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
const totalDeposits = movements
  .filter(mov=> mov > 0)
  // .map(mov=> mov * eurToUsd)
  .map((mov, i, arr)=>{
    console.log('array where map method is called on: ',arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov)=> acc + mov, 0)
console.log('totalDeposits', totalDeposits);





