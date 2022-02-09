let buttons = document.getElementsByTagName('button')
let inputs = document.getElementsByTagName('input')
let paragraphs = document.getElementsByTagName('p')

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    const value = inputs[i].value.toString().split(''); 
    let digitArray = value.map(Number) //creating a new array where every single string number is converted into an integer
    let sum = 0;
    for (const number of digitArray) {
      sum += number;
    }
    paragraphs[i].textContent = 'Sum: ' + sum
  })
}