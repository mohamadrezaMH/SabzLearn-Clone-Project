import { login } from "./funcs/auth.js";

const loginBtn = document.querySelector('#login-btn')

console.log('Login.js');

loginBtn.addEventListener('click', event => {
    event.preventDefault()
    login()
})