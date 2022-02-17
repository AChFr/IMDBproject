const username = document.getElementById('username')
const email = document.getElementById('email')
const password1 = document.getElementById('password1')
const password2 = document.getElementById('password2')

username.onsubmit = e => {
    
    e.preventDefault()

    const inputValue = e.target[0].value
    inputValue.match(/^\d{4}$/) ? console.log('username validation') : alert("Username must contain at least 4 characters.")
}

password1.onsubmit = e => {

    e.preventDefault()

    const inputValue = e.target[0].value
    inputValue.match(/[0-9]/) && inputValue.match(/[A-Z]/) && inputValue.length >= 6 ? console.log('pwd1 validation') : alert("Invalid password format. Please, try again.")
}

password2.onsubmit = e => {

    e.preventdefault()

    const inputValue = e.target[0].value
    inputValue.match(password1) ? console.log('pwd2 validation') : alert("Passwords do not match. Please, try again.")
}

