const xyz = '24234.454dasd'
console.log(parseInt(xyz)) //24234
console.log(parseFloat(xyz)) //24234.454

function stringToNum(str){
  if(Number.isNaN('dsfdsfd')){
  throw 'String that cannot be converted'
	}
  if (Number.isInteger(str)) return Number.parseInt(str)
}

console.log(stringToNum('5.65asdsad'))

console.log(`Number.isNaN()`, Number.isNaN('salesforce')) // false
console.log(`Global isNan()`, isNaN('salesforce')); // true 

const now = new Date()
console.log(now);


const start = new Date()
function dateFormat(date){
    return `${date.getDate()} - ${date.getMonth() + 1} -${date.getFullYear()}`
}
console.log(dateFormat(start));