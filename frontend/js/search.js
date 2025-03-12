import { globalSearch } from "./funcs/shared.js";

window.addEventListener('load', () => {
    globalSearch().then(data => {
        console.log(data);
    })
})
