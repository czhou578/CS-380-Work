// function style 1: use keyword
// function <function name>(<argument names>) { <code> }
function myFunction(a, b = 0) {
    /*
        Arguments are always optional. In this example, we set b to 0 if
        the caller does not provide a value. We do not declare a default
        for a, so it will be set to the constant "undefined" if the caller
        does not provide a value.
    */
    console.log('a', a)
    console.log('b', b)
    return a + b
}

// this will result in a = 2 and b = 0
const sum = myFunction(2)
console.log('sum =', sum)
// extra parameters will be ignored, so the 9 here has no effect
console.log('sum with extra parameters', myFunction(1, 4, 9))
// No parameters will result in defaults. This will result in the
// constant "NaN" because undefined + a number is NaN (not a number).
console.log('sum with no parameters', myFunction())

/* function style 2: arrow functions
   the closest equivalent in Java is: { x -> x * x }
   the closest equivalent in Python is: lambda x: x * x
   
   There are a few shorthand variations of arrow function syntax.
   This example has the format of
   (<argument names>) => { <code> }
*/
const myArrowFunction = (x) => {
    return x * x
}
// if an arrow function has exactly one argument you can omit the parentheses
const equivalentArrowFunction1 = x => {
    return x * x
}
// If an arrow function consists of exactly one expression or statement you
// can omit the braces. The arrow function will return the outcome.
const equivalentArrowFunction2 = x => x * x

/* IIFE: Immediately Invoked Function Expression
   We create an anonymous function, then call it immediately without
   assigning it to a variable. This is useful for setup logic we only
   ever want to run once since there will be no way to access it after.
*/
(
    () => {
        console.log('aegargttg')
    }
)();
