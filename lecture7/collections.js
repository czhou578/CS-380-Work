/* There is no such thing as a C/Java array in JavaScript.
   The things called arrays are resizable, like Python/Java/C# lists.
   
   While there is technically a constructor for arrays, you will almost
   always see the array literal syntax []. You can specify initial values
   in the array as a comma-separated list.

   Arrays can contain any type.
*/
const myArray = [1, 4, 12, 5, 17, 17, 1, 22]
/* You can access arrays using the [] operator.
   Arrays do not have to be contiguous; you can set a value at an index
   that's not adjacent to the existing values, like setting a value at
   index 20 in an eight element array.

   Trying to read a value from an index that has not been set will
   not result in an error. Instead, it will return the constant "undefined".
*/
myArray[20] = 11

/* The other commonly used collection/data structure in JavaScript is the object.
   Objects in JavaScript are more like Maps or Dictionaries in other languages -
   you can use the [] operator to get and set member variables. It's possible to
   create classes that will define member variables for new objects (covered in
   a future class), but optional. You can create an empty object using the literal
   {}. You can provide a comma-separated list of member variables as well, as shown
   here. If your keys are strings that would work as valid variable names (only 
   letters, numbers, and a few characters like underscores) then you can omit the
   quotation marks. { a: 1 } is equivalent to { 'a': 1 }, but you need quotes for
   { 'a-negative': 1 }.
*/
const myObject = { a: 1, b: 12, c: 4 }

if(myObject.a === myObject['a']) {
    console.log('dereferencing and [] operator work the same for objects')
}

// for each loops in JavaScript will always go over the keys/indexes of the
// provided object, not the values.
for(let i in myArray) {
    // i is the index
    console.log('array:', i, myArray[i])
}
for(let k in myObject) {
    console.log('object:', k, myObject[k])
}

/* Arrays also have some methods that let you use functions to do things
   for which you'd normally use for loops. Three of these work very similarly:
   forEach, map, and filter. All three take a function as an argument. They will
   iterate over the array, calling the provided function with the value and index
   of each position, going from index 0 up to length - 1. The differences between
   the methods are in what their return values are used for:

   - forEach will ignore the return value of the provided function.
   - map will return an array containing all the return values from the provided function.
   - filter will return an array containing all the values from the original
     array for which the provided function returned true.
*/
myArray.forEach((value, index) => console.log(index, ":", value))
const squares = myArray.map(i => i * i)
console.log(squares)

const evens = myArray.filter(x => x % 2 === 0)

/* reduce is similar to the three methods listed above, but the way it uses
   the return value of the provided function is special: it uses the return
   value of the last call to the function as an argument to the next call.
   It also allows you to provide an initial value to use on the first call
   since there was nothing returned yet.

   In this example we provide a default of 0, so reduce() will:
   - call our function with 0 and myArray[0], then take the return value and
   - call our function with the previous return value and myArray[1], then 
     take the return value and
   - call our function with the previous return value and myArray[2], etc.
*/
const sum = myArray.reduce((runningSum, current) => runningSum + current, 0)
