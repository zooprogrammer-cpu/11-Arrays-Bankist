// The new at method in ES6
const arr = [23,11,64];
console.log(arr[0]); //23
console.log(arr.at(0)); //23 
// why useful? to get last element traditionally- 
console.log(arr[arr.length - 1]); //64
console.log(arr.slice(-1)[0]); //64
console.log(arr.at(-1)); //64  also can use method chaining

console.log('Ash'.at(-1)); //h


