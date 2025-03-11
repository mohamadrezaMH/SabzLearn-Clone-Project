import { getSessionDetails } from "./funcs/shared.js";

window.addEventListener('load', () => {
    getSessionDetails().then(data => {
        console.log(data);
    })
})