import { getMe } from "./auth.js";
import { isLogin } from "./utils.js";

const showUserNameInNavbar = () => {
  const navbarProfileBox = document.querySelector(".main-header__profile");
  const isUserLogin = isLogin();
  
  if (isUserLogin) {
    const userInfos = getMe().then((data) => {
      navbarProfileBox.setAttribute("href", "index.html");
      navbarProfileBox.innerHTML = `<span class="main-header__profile-text">${data.name}</span>`;
    });
  } else {
    navbarProfileBox.setAttribute("href", "login.html");
    navbarProfileBox.innerHTML =
      '<span class="main-header__profile-text">ثبت نام / ورود</span> ';
  }
};

const renderTopbarMenus = async () => {
  const topBarList = document.querySelector('.top-bar__menu')

  const res = await fetch(`http://localhost:4000/v1/menus/topbar`)
  const topbarMenus = await res.json()

  console.log(topbarMenus);

  topBarList.innerHTML = '';
  const shuffleArray = topbarMenus.sort((a,b) => 0.5 - Math.random());

  shuffleArray.slice(0, 6).map(menu => {
    topBarList.innerHTML += `<li class="top-bar__item">
      <a href="#" class="top-bar__link">${menu.title}</a>
    </li>`
  })

}

export { showUserNameInNavbar, renderTopbarMenus };
