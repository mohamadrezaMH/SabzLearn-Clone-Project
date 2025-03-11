import { showUserNameInNavbar, renderTopbarMenus, createNewNewsLetter } from './funcs/shared.js'

window.addEventListener('load', () => {
    showUserNameInNavbar()
    renderTopbarMenus()

    // Join on NewsLetter
    const newsLetterSubmitBtn = document.querySelector('#news-letter-submit-btn')
    newsLetterSubmitBtn.addEventListener('click', event => {
        event.preventDefault()
        console.log('Click');
        createNewNewsLetter()
    })
})