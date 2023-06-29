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
// Setting sort = false to sort the movements or not
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; //Empty the containerMovemnts and the add new elements
  // Use slice here to make a copy and then chain with sort instead of spread operator
  const movs = sort ? movements.slice().sort((a,b) => a - b) : movements;
  
  movs.forEach(function (mov, i) {
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

// Some - only grant a loan if there is at 
// least one deposit with 10% of the requested loan amount
btnLoan.addEventListener('click', function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount >= 0 && currentAccount.movements.some(
    mov => mov >= amount * 0.1)){
    // Add the movement
    currentAccount.movements.push(amount); 
    // update UI
    updateUI(currentAccount);
  }
  // clear the loan input field
  inputLoanAmount.value = '';

});
// Event listener for sorting
let sorted = false; //state variable for sort button 
btnSort.addEventListener('click', function(e){
  e.preventDefault(); 
  displayMovements(currentAccount.movements, !sorted); // do the opposite of sorted
  sorted = !sorted; 
})

// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  // { weight: 13, curFood: 275, owners: 'Sarah'},
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

dogs.forEach(dog => dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28));

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'))
console.log(sarahsDog);

if (sarahsDog.curFood > sarahsDog.recommendedFood){
  console.log(`Sarah's dog is eating too much`);
} 
if (sarahsDog.curFood < sarahsDog.recommendedFood){
  console.log(`Sarah's dog is eating too little`);
} 

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// Loop over dogs and find dogs that eat too much
const ownersEatTooMuch = dogs
  .filter(dog=>dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners); 
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog=>dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners); 
console.log(ownersEatTooLittle);

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`)
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`)

// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood)); // false

// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
const checkEatingOkay = dog => 
  dog.curFood > dog.recommendedFood * 0.9 
  && dog.curFood < dog.recommendedFood * 1.1;

console.log(dogs.some(checkEatingOkay));
        
// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
console.log(dogs.filter(checkEatingOkay));

// 8.
// Create a shallow copy of the dogs array 
// and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
const dogSorted = dogs.slice().sort((a,b) => a.recommendedFood - b.recommendedFood);
console.log(dogSorted);




