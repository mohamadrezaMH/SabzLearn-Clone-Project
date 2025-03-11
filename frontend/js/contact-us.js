import { submitContactUsMsg } from "./funcs/shared.js";

window.addEventListener("load", () => {
  const submitBtn = document.querySelector("#submit-btn");
  submitBtn.addEventListener("click", event => {
    event.preventDefault()
    submitContactUsMsg();
  });
});
