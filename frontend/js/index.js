import {
  getAndShowAllCourses,
  getAndShowArticles,
  getAndShowNavbarMenus,
  getAndShowPopularCourses,
  getAndShowPresellCourses,
  globalSearch,
} from "./funcs/shared.js";

const $ = document;
const landingTitle = $.querySelector(".landing__title");
const landingCoursesCount = $.querySelector("#courses-count");
const landingHoursCount = $.querySelector("#minutes-counter");
const landingUsersCount = $.querySelector("#users-counter");
const globalSearchBtn = $.querySelector("#search-btn");
const globalSearchInput = $.querySelector("#search-input");

window.addEventListener("load", () => {
  let landingText = "ما به هر قیمتی دوره آموزشی تولید نمی کنیم!";
  let typeIndex = 0;

  typeWriter(landingText, typeIndex);
  makeCounter(77, landingCoursesCount);
  hourMakeCounter(172_842, landingHoursCount);
  userMakeCounter(1_598, landingUsersCount);
  getAndShowAllCourses();
  getAndShowPopularCourses();
  getAndShowPresellCourses();
  getAndShowArticles();
  getAndShowNavbarMenus().then((data) => {
    console.log(data);
  });

  // Handling global search
  globalSearchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Click");
    location.href = `search.html?value=${globalSearchInput.value.trim()}`;
  });
});

function typeWriter(text, index) {
  if (index < text.length) {
    landingTitle.innerHTML += text[index];
    index++;
  }
  if (index == text.length) {
    landingTitle.innerHTML = "! ";
    index = 0;
  }

  setTimeout(() => {
    typeWriter(text, index);
  }, 100);
}
function makeCounter(max, elem) {
  let counter = 0;
  const interval = setInterval(() => {
    if (counter >= max) {
      clearInterval(interval);
    }

    elem.innerHTML = counter;
    counter += 1;
  }, 80);
}

function hourMakeCounter(max, elem) {
  let counter = 0;
  const interval = setInterval(() => {
    if (counter >= max) {
      clearInterval(interval);
    }

    elem.innerHTML = counter;
    counter += 100;
  }, 0.1);
}

function userMakeCounter(max, elem) {
  let counter = 0;
  const interval = setInterval(() => {
    if (counter >= max) {
      clearInterval(interval);
    }

    elem.innerHTML = counter;
    counter += 10;
  }, 50);
}
