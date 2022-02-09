let button = document.querySelector(".test")


button.onclick = () => { console.log('a') }
function onClick() {
  console.log('b')
}
button.addEventListener('click', () => console.log('c'))
button.onclick = onClick