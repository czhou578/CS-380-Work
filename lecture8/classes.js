
class MyClass {
    // member variable initialization
    y = 2
    // Java would use public MyClass()
    // Python would use __init__
    constructor() {
        // member variables _must_ use this. for access inside methods
        this.x = 2
    }

    printX() {
        console.log(this.x)
    }
}

const myObject = new MyClass()
myObject.printX()
myObject.x = 4
myObject.printX()

/*
    Classes in JavaScript are not nearly as strict as classes in Java, C++, etc.
    The basically provide two things: initialization code and default implementations
    of methods for new objects. If we check the type of an object, it's still just
    'object'. We can assign different implementations of methods to individual objects
    and it will override the class's definition.
*/
myObject.printX = () => console.log('No.')
myObject.printX()

/*
    In reality, classes set the __proto__ field on instances. When you dereference
    a member variable or method on an object, the JavaScript interpreter will check for
    that variable on the object itself, then on the object's __proto__ variable, then
    on __proto__'s __proto__, etc., similar to how the interpreter will propagate an event
    up the document tree. In the case of myObject, the interpreter will check myObject,
    then MyClass (myObject's prototype), then the base Object definition (MyClass's
    prototype). The base Object definition's __proto__ is null, so if the variable isn't
    on any of those three the interpreter will throw a TypeError.
*/
// will refer to printX() from line 12, but since we're calling it on __proto__
// "this" won't refer to myObject and will print undefined.
myObject.__proto__.printX()

// Setting printX on line 29 didn't remove the original printX(), it just hid it.
// Deleting our new definition just tells the interpreter to fall back to __proto__'s definition.
delete myObject.printX
myObject.printX()