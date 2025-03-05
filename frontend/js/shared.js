import { getMe } from "./funcs/auth.js";

window.addEventListener('load', () => {
    getMe().then(data => {
        console.log(data);
    })
})