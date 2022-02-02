
// function declaration using the "function" keyword
function f() {
    // i is reassignable but only accessible inside the for loop
    for(let i = 0; i < 10; i++) {
        // console.log() = print()/System.out.println()
        // strings can use single or double quotes
        console.log('hi!')
    }

    if(1000 < 2000) {
        // a and i are not reassignable and only accessible inside the if statement
        // array initialization
        const a = [1, 2, 3]
        // object initialization
        const i = {
            a: 1
        }
        // we can't reassign i, but we can modify parts of the object it's assigned
        i['b'] = 2
        console.log(i)
    }
}

// function invocation
// this is global level; it will execute when the browser reads this file
f()

/*
variable declaration with no scope: global, even outside of this file
  x = 2

variable declaration with var: function-wide, lifted to top of function. Do not use unless you have to; it's confusing!
  var x = 2

variable declaration with let: scoped to if, for, function, basically any { }
  let x = 2

variable declaration with const: like let, but can't reassign the variable
 const x = 2
 // x = 3 -> TypeError
*/

/*
  Java:
  int x;
  System.out.print(x); // compile error
*/

/*
  Python:
  x # tries to get value of x rather than declaring x
*/

// let a; // sets a = undefined and lets us change its value later
// const b; // sets b = undefined for the lifetime of the variable

// let test = document.getElementById('these').querySelectorAll('input')
// test.forEach((value) => value.value = "")

// console.log(test);

// const a = [4, 4, 5, 5]
// const b = a.map((c, d) => c * d)
// let x = 0
// b.forEach(e => x += e)
// console.log(x);

let a;
a = 2;
a = { score: 2 };
console.log(a);