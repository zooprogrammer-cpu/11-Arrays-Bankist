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
// displayMovements(account1.movements);

// Sum all balance using reduce 
const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, mov) => {
    return acc + mov
  }, 0);
  labelBalance.textContent = `${acc.balance} €`;

};
// calcDisplayBalance(account1.movements);

// Sum only the income and out using filter and reduce
const calcDisplaySummary = (acc) => {
  const incomes = acc.movements.filter(mov=> mov > 0)    
  .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent =`${incomes}€`;

  const out = acc.movements.filter(mov=> mov < 0)
  .reduce((acc,mov) =>acc +mov, 0);
  labelSumOut.textContent =`${Math.abs(out)}€`;

  const interest = acc.movements.filter(mov=> mov >0)
  .map(deposit => deposit * acc.interestRate/100)
  .filter((int, i, arr)=> {
    console.log(arr);
    return int >= 1; // give interest on only 1
  })
  .reduce((acc,int) =>acc + int, 0);
  labelSumInterest.textContent =`${interest}€`;

};

// calcDisplaySummary(account1.movements);

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

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance 
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
}

// Username and pin log in

// Event Handlers
// When you click this, LOGIN gets printed
// but page reloads quickly since that is the default behavior
// Enter is the same as user clicking login
let currentAccount; 
btnLogin.addEventListener('click', function(e){
  //call preventDefault method to prevent form for submitting
  e.preventDefault(); 
  console.log('LOGIN');

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
    );
    console.log(currentAccount);
    if (currentAccount?.pin === Number(inputLoginPin.value)){
      console.log('PIN LOGIN');
      // Display UI and welcome message
      labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
      containerApp.style.opacity = 100; // default opactiy on css is 0. 
      
      // Clear login input and pin fields
      inputLoginUsername.value = inputLoginPin.value = '';
      // Remove forcus from pin fleid
      inputLoginPin.blur(); 

      // update UI
      updateUI(currentAccount); 
    }
});

// Transfer money to another user
btnTransfer.addEventListener('click', function(e){
  e.preventDefault(); 
  const amount =  Number(inputTransferAmount.value); 
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value);
    console.log(amount, receiverAcc );
    // clear transfer to fields
    inputTransferTo.value = inputTransferAmount.value = '';
    // allow only positive transfers 
    // and current user has enought money to do this transfer
    if (amount > 0 && receiverAcc && currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username){
        // Doing the transfer
        console.log(`Transfer valid`);
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        // update UI
        updateUI(currentAccount); 
    }

});

///////
// Closing an account means deleting the account object
// Use splice to delete the account
btnClose.addEventListener('click', function(e){
  e.preventDefault();
  // delete account if the currentuser is the same as the account to delete
  if (currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)){
    console.log(`Delete account`);
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)
    console.log(`index: ${index}`);
    accounts.splice(index, 1);
    console.log(`accounts after deletion:`, accounts);
    // hide the UI
    containerApp.style.opacity = 0; 
  }
  // clear close account fields
  inputCloseUsername.value === inputClosePin.value === '';

})









