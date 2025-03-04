import { register } from "./funcs/auth.js";

const registerBtn = document.querySelector("#register-btn");

console.log('Register.js');

registerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  register();
});
