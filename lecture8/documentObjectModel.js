/****** The Document Object Model (DOM) ******
The document object model is a set of classes and functions that browsers
make available to JavaScript so you can find, add, modify, move, and remove
elements in webpages.
*/

/*
    In a browser (i.e. not Node.js) global variables actually members of the
    window object. These two top-level statements are identical:

    x = 2;
    window.x = 2;
*/

/*
    Inside the global window object, every webpage has a document object. This
    represents the root of the entire document tree when accessing it from
    JavaScript.

    A lot of the objects that the browser provides us in JavaScript are backed
    by corresponding C++ classes. Different HTML element types have their own
    classes, but they derive a lot of methods from a common parent class.
*/

/*
    Element objects have several methods for finding descendants:
    - getElementById() will take a string and find the one descendant with an
      id equal to that string or null otherwise.
    - getElementsByTagName() will take a string and find all descendants with
      tag names/types (div, p, input, etc.) equal to that string.
    - getElementsByClassName() will take a string and find all descendants with
      that string as one of their classes.

    Ids are supposed to be unique, so getElementById() returns one element or null.
    Tag names and classes are not, so the two corresponding methods return instances
    of the HTMLCollection class. If they don't find anything, they return an empty
    collection, not null. HTMLCollection is like a simple combination of an array
    and an object - you can access the found elements by numerical index or by an
    identifier, such as id or name. HTMLCollection has a length property as well,
    so you can do a traditional for(let i = 0; i < elements.length; i++) to iterate
    over its elements. Warning: for(let e in elements) will _not_ work the way you
    want; it will go over all the array indexes _and_ all of the ids/names, so you
    will end up with duplicate values.
    
    One plus (or sometimes minus) of HTMLCollection is that it's a _live_ collection,
    meaning that if you change the document by adding or removing elements then your
    HTMLCollection instances will change as well. This can be handy for including new
    elements in your iteration, but it can also mess up iteration order or lead to
    infinite loops.
*/
console.log(document.getElementById('headline'))
console.log(document.getElementsByTagName('input'))
console.log(document.getElementsByClassName('fizz-buzz'))

/*
    The getElement(s)ByX() methods are limited to only taking a single id, tag name,
    or class at a time. By contrast, querySelector() and querySelectorAll() accept
    nearly any possible CSS selector (support varies by browser). A good example of
    where this comes in handy is shown below: you would have to call
    getElementsByTagName() and then do a for loop of your own to filter down to 
    checkboxes, whereas querySelectorAll() lets you build that into your query with
    a single CSS selector.

    Unlike getElementsByX(), querySelectorAll() returns a NodeList instance, which
    is _not_ live (read: does not update when the document changes), does not have
    elements indexed by id or name, but does have some convenience methods like
    forEach(). querySelector() works like getElementById() in that it returns a
    single element or null.
*/
console.log(document.querySelectorAll('input[type=checkbox]'))

function intializePage() {       
    // gets all checkboxes
    const checkboxes = document.querySelectorAll('input[type=checkbox]')
    // NodeList gives us forEach, which calls our function once per
    // element in it with the element and the iteration index
    checkboxes.forEach((checkbox, i) => {
        // elements also have parentElement and children member variables
        // to get their parent and children in the tree, respectively
        const parent = checkbox.parentElement
        // the classList member variable has methods for adding or removing classes
        parent.classList.toggle('separated')
        // querySelector(), getElementsByClassName(), etc. can be used on any element,
        // not just document
        const spanSibling = parent.querySelector('span')
        // most HTML attributes like name or href are available as member variables
        spanSibling.innerText = checkbox.name
        if(i % 2 === 0) {
            // setting a member variable will update the corresponding HTML attribute
            checkbox.checked = true
        }
    })

    /****** Element creation ******
    
        We can create new elements by calling document.createElement(). Unlike the
        element finding methods covered above, createElement() only exists on document.
        
        createElement() takes a single string and creates an empty HTML element with a
        tag name equal to that string. 
        
        Even though we call this method on the document object, the new element it 
        creates does not get added to the tree by default. Instead, we have to call
        appendChild() on an existing element in the document (or on the document object
        itself).
        
        Side note: appendChild() works for existing elements that were already a part
        of the document tree, too. In that case it moves the element from its old location
        to become a child of the element on which we called appendChild().
    */
    const extraGroceries = ['bread', 'eggs', 'milk']
    extraGroceries.forEach(groceryItem => {
        const label = document.createElement('label')
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.name = groceryItem
        /*
            Setting innerText replaces the children of the element with a string of text.
            This is fine if we just created an element and it has no children, but we have
            the alternative of calling document.createTextNode() and appending the result
            as a child, just like with an element.
        */
        label.innerText = groceryItem
        label.appendChild(checkbox)
        document.querySelector('form').appendChild(label)
    })

    function setAllChecked(checked) {
        checkboxes.forEach(checkbox => checkbox.checked = checked)
    }

    /****** User event handling ******
        We can listen for user events such as key presses, clicks, touch gestures, etc.
        by setting member variables of elements. There are a large number of onX member
        variables, where X is a specific event. Below we set the onclick member variable
        to a function so that when the user clicks on the element the browser will call
        our function.

        The browser will pass our function an object containing details of the event.
        The member variables of the event vary by event type. For example, a click event
        will have the x,y coordinates of where the click happened, but that wouldn't apply
        to a key press. There are a few member variables and methods, however, that are
        available on all events.

        A decent number of elements will have some default behavior based on their element
        type. For example, any <button>s will search for their nearest <form> ancestor and
        try to submit the form. Sometimes we want to do additional validation or handle
        sending data ourselves, in which case we don't want the form to be submitted.
        For that situation we have the preventDefault() method.

        In addition to trigger default behavior, events also _propagate_ up the document
        tree. In other words, once our element's onclick function returns, the browser will
        try to call the onclick function of the element's parent, then its grandparent, etc.,
        all the way up to document.onclick. This means that we don't necessarily have to
        register a click handler for every individual element; we could set onclick for some
        common ancestor instead. Alternatively, if we want to explicitly stop an ancestor
        from receiving an event, we can call stopPropagation() on the event, just like how
        we can call preventDefault().

        Events also come with a member variable named target, which tells us the element from
        which the event originated. This is handy in the case that we add a listener on an
        ancestor or we take one function and set it as onclick for multiple elements. We'll
        see more examples of when this is useful when we get to React in a few weeks.

        Elements can only have one onX function at a time. If we try to set onclick to two 
        different functions on the same element, then whichever we assigned second would
        replace the first one and that first one will not be called when the user clicks
        on the element. In situations where we're likely to have multiple different functions
        we want to run based off the same event, we can use addEventListener(<event name>, function)
        to register a function without replacing old ones. There's also a corresponding
        removeEventListener() to remove functions we don't want called anymore.
    */

    const checkAll = document.getElementById('check-all')
    checkAll.onclick = event => {
        event.preventDefault()
        setAllChecked(true)
    }
    const uncheckAll = document.getElementById('uncheck-all')
    uncheckAll.onclick = event => {
        event.preventDefault()
        setAllChecked(false)
    }

    document.querySelector('input[type=number]').onchange = event => {
        // instead of having to store the input as a variable or running the querySelector()
        // again here, we can use event.target to get a reference to the triggering input
        if(event.target.value > 200) {
            event.target.classList.add('error')
        } else {
            event.target.classList.remove('error')
        }
    }
}

/*
    readystatechange will tell us when the browser has finished instantiating our page's
    elements and attached them to the document object. Before this event most of our script
    would fail because querySelector() and similar methods would not be able to find elements.
    Because of this (and sometimes for performance), it's common to delay a lot of our initialization
    code until after this event. If our initialization code is split into separate JavaScript files
    then we can easily end up with multiple functions we want to register for the same event.
    This is a prime example of when to use addEventListener() over setting an onX member variable.
*/
document.addEventListener('readystatechange', () => {
    if(document.readyState === 'complete') {
        intializePage();
    }
})

// example of ancestral propagation of events - this will catch clicks on pretty much any element in the page
document.onclick = event => {
    console.log('document onclick', event.target, event.path)
}