import { getMe } from "./auth.js";
import { isLogin, getUrlParam, getToken, showSwal } from "./utils.js";

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
  const topBarList = document.querySelector(".top-bar__menu");

  const res = await fetch(`http://localhost:4000/v1/menus/topbar`);
  const topbarMenus = await res.json();

  topBarList.innerHTML = "";

  const shuffledArray = topbarMenus.sort((a, b) => 0.5 - Math.random());

  shuffledArray.slice(0, 6).map((menu) => {
    topBarList.innerHTML += `<li class="top-bar__item">
      <a href="#" class="top-bar__link">${menu.title}</a>
    </li>`;
  });
};

const getAndShowAllCourses = async () => {
  const coursesContainer = document.querySelector("#courses-container");

  const res = await fetch(`http://localhost:4000/v1/courses`);
  const courses = await res.json();

  // src = http://localhost:4000/courses/covers/${course.cover}  آدرس درست دادن واسه عکس ها
  courses.slice(0, 6).map((course) => {
    coursesContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="col-4">
                <div class="course-box">
                  <a href="course.html?name=${course.shortName}">
                    <img src="./images/courses/${
                      course.cover
                    }" alt="Course img" class="course-box__img" />
                  </a>
                  <div class="course-box__main">
                    <a href="course.html?name=${
                      course.shortName
                    }" class="course-box__title">${course.name}</a>

                    <div class="course-box__rating-teacher">
                      <div class="course-box__teacher">
                        <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                        <a href="#" class="course-box__teacher-link">${
                          course.creator
                        }</a>
                      </div>
                      <div class="course-box__rating">
                      ${Array(5 - course.courseAverageScore)
                        .fill(0)
                        .map(
                          (score) =>
                            '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
                        )
                        .join("")}
                      ${Array(course.courseAverageScore)
                        .fill(0)
                        .map(
                          (score) =>
                            '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
                        )
                        .join("")}
                      </div>
                    </div>

                    <div class="course-box__status">
                      <div class="course-box__users">
                        <i class="fas fa-users course-box__users-icon"></i>
                        <span class="course-box__users-text">${
                          course.registers
                        }</span>
                      </div>
                      <span class="course-box__price">${
                        course.price === 0
                          ? "رایگان"
                          : course.price.toLocaleString()
                      }</span>
                    </div>
                  </div>

                  <div class="course-box__footer">
                    <a href="#" class="course-box__footer-link">
                      مشاهده اطلاعات
                      <i class="fas fa-arrow-left course-box__footer-icon"></i>
                    </a>
                  </div>

                </div>
              </div>
    `
    );
  });
  return courses;
};

const getAndShowPopularCourses = async () => {
  const popularCoursesWrapper = document.querySelector(
    "#popular-courses-wrapper"
  );

  const res = await fetch(`http://localhost:4000/v1/courses/popular`);
  const popularCourses = await res.json();

  popularCourses.forEach((course) => {
    popularCoursesWrapper.insertAdjacentHTML(
      "beforeend",
      `
    <div class="swiper-slide">
    <div class="course-box">
      <a href="#">
        <img src="./images/courses/${
          course.cover
        }"  alt="Course img" class="course-box__img" />
      </a>
      <div class="course-box__main">
        <a href="#" class="course-box__title">${course.name}</a>

        <div class="course-box__rating-teacher">
          <div class="course-box__teacher">
            <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
            <a href="#" class="course-box__teacher-link">${course.creator}</a>
          </div>
          <div class="course-box__rating">
          ${Array(5 - course.courseAverageScore)
            .fill(0)
            .map(
              (score) =>
                '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
            )
            .join("")}
          ${Array(course.courseAverageScore)
            .fill(0)
            .map(
              (score) =>
                '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
            )
            .join("")}
          </div>
        </div>

        <div class="course-box__status">
          <div class="course-box__users">
            <i class="fas fa-users course-box__users-icon"></i>
            <span class="course-box__users-text">${course.registers}</span>
          </div>
          <span class="course-box__price">${
            course.price === 0 ? "رایگان" : course.price.toLocaleString()
          }</span>
        </div>
      </div>

      <div class="course-box__footer">
        <a href="#" class="course-box__footer-link">
          مشاهده اطلاعات
          <i class="fas fa-arrow-left course-box__footer-icon"></i>
        </a>
      </div>

    </div>
  </div>
    `
    );
  });

  return popularCourses;
};

const getAndShowPresellCourses = async () => {
  const presellCoursesWrapper = document.querySelector(
    "#presell-courses-wrapper"
  );

  const res = await fetch(`http://localhost:4000/v1/courses/presell`);
  const presellCourses = await res.json();

  presellCourses.forEach((course) => {
    presellCoursesWrapper.insertAdjacentHTML(
      "beforeend",
      `
    <div class="swiper-slide">
    <div class="course-box">
      <a href="#">
        <img src=http://localhost:4000/courses/covers/${
          course.cover
        } alt="Course img" class="course-box__img" />
      </a>
      <div class="course-box__main">
        <a href="#" class="course-box__title">${course.name}</a>

        <div class="course-box__rating-teacher">
          <div class="course-box__teacher">
            <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
            <a href="#" class="course-box__teacher-link">${course.creator}</a>
          </div>
          <div class="course-box__rating">
          ${Array(5 - course.courseAverageScore)
            .fill(0)
            .map(
              (score) =>
                '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
            )
            .join("")}
          ${Array(course.courseAverageScore)
            .fill(0)
            .map(
              (score) =>
                '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
            )
            .join("")}
          </div>
        </div>

        <div class="course-box__status">
          <div class="course-box__users">
            <i class="fas fa-users course-box__users-icon"></i>
            <span class="course-box__users-text">${course.registers}</span>
          </div>
          <span class="course-box__price">${
            course.price === 0 ? "رایگان" : course.price
          }</span>
        </div>
      </div>

      <div class="course-box__footer">
        <a href="#" class="course-box__footer-link">
          مشاهده اطلاعات
          <i class="fas fa-arrow-left course-box__footer-icon"></i>
        </a>
      </div>

    </div>
  </div>
    `
    );
  });

  return presellCourses;
};

const getAndShowArticles = async () => {
  const articlesWrapper = document.querySelector("#articles-wrapper");

  const res = await fetch(`http://localhost:4000/v1/articles`);
  const articles = await res.json();

  articles.slice(0, 6).forEach((article) => {
    articlesWrapper.insertAdjacentHTML(
      "beforeend",
      `
    <div class="col-4">
    <div class="article-card">
      <div class="article-card__header">
        <a href="#" class="article-card__link-img">
          <img src=http://localhost:4000/courses/covers/${article.cover} class="article-card__img" alt="Article Cover" />
        </a>
      </div>
      <div class="article-card__content">
        <a href="#" class="article-card__link">
          ${article.title}
        </a>
        <p class="article-card__text">
        ${article.description}
        </p>
        <a href="#" class="article-card__btn">بیشتر بخوانید</a>
      </div>
    </div>
  </div>
    `
    );
  });

  return articles;
};

const getAndShowNavbarMenus = async () => {
  const menusWrapper = document.querySelector("#menus-wrapper");

  const res = await fetch(`http://localhost:4000/v1/menus`);
  const menus = await res.json();

  menus.forEach((menu) => {
    // console.log(menu.href);
    menusWrapper.insertAdjacentHTML(
      "beforeend",
      `
    <li class="main-header__item">
    <a href=category.html?cat=${menu.href} class="main-header__link">${
        menu.title
      }
      ${
        menu.submenus.length !== 0
          ? `<i class="fas fa-angle-down main-header__link-icon"></i>
        <ul class="main-header__dropdown">
        ${menu.submenus
          .map(
            (submenu) =>
              `<li class="main-header__dropdown-item">
            <a href="#" class="main-header__dropdown-link">
             ${submenu.title}
            </a>
          </li>`
          )
          .join("")}
        </ul>`
          : ""
      }
    </a>
  </li>
    `
    );
  });

  return menus;
};

const getAndShowCategoryCourses = async () => {
  const categoryName = getUrlParam("cat");

  const res = await fetch(
    `http://localhost:4000/v1/courses/category/${categoryName}`
  );
  const courses = await res.json();

  return courses;
};

const insertCourseBoxHtmlTemplate = (courses, showType, parentElement) => {
  parentElement.innerHTML = "";

  if (showType === "row") {
    courses.forEach((course) => {
      parentElement.insertAdjacentHTML(
        "beforeend",
        `
            <div class="col-4">
            <div class="course-box">
              <a href="#">
                <img src="images/courses/js_project.png" alt="Course img" class="course-box__img" />
              </a>
              <div class="course-box__main">
                <a href="#" class="course-box__title">${course.name}</a>
        
                <div class="course-box__rating-teacher">
                  <div class="course-box__teacher">
                    <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                    <a href="#" class="course-box__teacher-link">${
                      course.creator
                    }</a>
                  </div>
                  <div class="course-box__rating">
                    ${Array(5 - course.courseAverageScore)
                      .fill(0)
                      .map(
                        (score) =>
                          '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
                      )
                      .join("")}
                    ${Array(course.courseAverageScore)
                      .fill(0)
                      .map(
                        (score) =>
                          '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
                      )
                      .join("")}
                  </div>
                </div>
        
                <div class="course-box__status">
                  <div class="course-box__users">
                    <i class="fas fa-users course-box__users-icon"></i>
                    <span class="course-box__users-text">${
                      course.registers
                    }</span>
                  </div>
                  <span class="course-box__price">${
                    course.price === 0
                      ? "رایگان"
                      : course.price.toLocaleString()
                  }</span>
                </div>
              </div>
        
              <div class="course-box__footer">
                <a href="#" class="course-box__footer-link">
                  مشاهده اطلاعات
                  <i class="fas fa-arrow-left course-box__footer-icon"></i>
                </a>
              </div>
        
            </div>
          </div>
            `
      );
    });
  } else {
    courses.forEach((course) => {
      parentElement.insertAdjacentHTML(
        "beforeend",
        `
      <div class="col-12">
      <div class="course-box">
          <div class="course__box-header">
              <div class="course__box-right">
                  <a class="course__box-right-link" href="#">
                      <img src=http://localhost:4000/courses/covers/${
                        course.cover
                      } class="course__box-right-img">
                  </a>
              </div>
              <div class="course__box-left">
                  <div class="course__box-left-top">
                      <a href="#" class="course__box-left-link">${
                        course.name
                      }</a>
                  </div>
                  <div class="course__box-left-center">
                      <div class="course__box-left-teacher">
                          <i class="course__box-left-icon fa fa-chalkboard-teacher"></i>
                          <span class="course__box-left-name">${
                            course.creator
                          }</span>
                      </div>
                      <div class="course__box-left-stars">
                        ${Array(5 - course.courseAverageScore)
                          .fill(0)
                          .map(
                            (score) =>
                              '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
                          )
                          .join("")}
                        ${Array(course.courseAverageScore)
                          .fill(0)
                          .map(
                            (score) =>
                              '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
                          )
                          .join("")}
                      </div>
                  </div>
                  <div class="course__box-left-bottom">
                      <div class="course__box-left-des">
                          <p>امروزه کتابخانه‌ها کد نویسی را خیلی آسان و لذت بخش تر کرده اند. به قدری
                              که
                              حتی امروزه هیچ شرکت برنامه نویسی پروژه های خود را با Vanilla Js پیاده
                              سازی
                              نمی کند و همیشه از کتابخانه ها و فریمورک های موجود استفاده می کند. پس
                              شما هم
                              اگه میخواید یک برنامه نویس عالی فرانت اند باشید، باید کتابخانه های
                              کاربردی
                              که در بازار کار استفاده می شوند را به خوبی بلد باشید</p>
                      </div>
                  </div>
                  <div class="course__box-footer">
                      <div class="course__box-footer-right">
                          <i class="course__box-footer-icon fa fa-users"></i>
                          <span class="course__box-footer-count">${
                            course.registers
                          }</span>
                      </div>
                      <span class="course__box-footer-left">${
                        course.price === 0
                          ? "رایگان"
                          : course.price.toLocaleString()
                      }</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
      `
      );
    });
  }
};

const coursesSorting = (array, filterMethod) => {
  let outputArray = [];

  switch (filterMethod) {
    case "free": {
      outputArray = array.filter((course) => course.price === 0);
      break;
    }
    case "money": {
      outputArray = array.filter((course) => course.price !== 0);
      break;
    }
    case "first": {
      outputArray = [...array].reverse();
      break;
    }
    case "last": {
      outputArray = array;
      break;
    }
    case "default": {
      outputArray = array;
      break;
    }
    default: {
      outputArray = array;
    }
  }

  return outputArray;
};

const getCourseDetails = () => {
  const courseShortName = getUrlParam("name");

  // Select Elems From DOM
  const $ = document;
  const courseTitleElem = $.querySelector(".course-info__title");
  const courseDescElem = $.querySelector(".course-info__text");
  const courseCategoryElem = $.querySelector(".course-info__link");
  const courseRegisterInfoElem = $.querySelector(
    ".course-info__register-title"
  );
  const courseStatusElem = $.querySelector(".course-boxes__box-left--subtitle");
  const courseSupperElem = $.querySelector(".course-boxes__box-left--support");
  const courseLastUpdateElem = $.querySelector(
    ".course-boxes__box-left--last-update"
  );
  const courseTimeElem = $.querySelector(".course-boxes__box-left--time");
  const courseCommentsCountElem = $.querySelector(
    ".course-info__total-comment-text"
  );
  const courseStudentsCountElem = $.querySelector(
    ".course-info__total-sale-number"
  );

  fetch(`http://localhost:4000/v1/courses/${courseShortName}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((course) => {
      console.log(course);
      let courseTime = 0;
      course.sessions.map((course) => {
        let coursesTime = course.time.slice(0, 2);
        courseTime += Number(coursesTime);
      });
      courseTitleElem.innerHTML = course.name;
      courseTimeElem.innerHTML = courseTime + " ساعت";
      courseDescElem.innerHTML = course.description;
      courseCategoryElem.innerHTML = course.categoryID.title;
      courseRegisterInfoElem.insertAdjacentHTML(
        "beforeend",
        course.isUserRegisteredToThisCourse
          ? "دانشجوی دوره هستید"
          : "ثبت نام در دوره"
      );
      courseStatusElem.innerHTML = course.isComplete
        ? "تکمیل شده"
        : "در حال برگزاری";
      courseSupperElem.innerHTML = course.support;
      courseLastUpdateElem.innerHTML = course.updatedAt.slice(0, 10);
      courseCommentsCountElem.innerHTML = `${course.comments.length} دیدگاه`;
      courseStudentsCountElem.innerHTML = course.courseStudentsCount;
      const commentsContentWrapper = $.querySelector(".comments__content");

      // Show Course Sessions
      const sessionsWrapper = $.querySelector(".sessions-wrapper");

      if (course.sessions.length) {
        course.sessions.forEach((session, index) => {
          sessionsWrapper.insertAdjacentHTML(
            "beforeend",
            ` 
              <div class="accordion-body introduction__accordion-body">
                <div class="introduction__accordion-right">
                  <span class="introduction__accordion-count">${
                    index + 1
                  }</span>
                  <i class="fab fa-youtube introduction__accordion-icon"></i>
                  ${
                    session.free || course.isUserRegisteredToThisCourse
                      ? `
                        <a href="episode.html?name=${course.shortName}&id=${session._id}" class="introduction__accordion-link">
                          ${session.title}
                        </a>
                    `
                      : `
                        <span class="introduction__accordion-link">
                          ${session.title}
                        </span>
               
                    `
                  }
                </div>
                <div class="introduction__accordion-left">
                  <span class="introduction__accordion-time">
                    ${
                      course.isUserRegisteredToThisCourse || session.free
                        ? session.time
                        : ` ${session.time} <i class="fa fa-lock"></i>`
                    } 
                  </span>
                </div>
              </div>
          `
          );
        });
      } else {
        sessionsWrapper.insertAdjacentHTML(
          "beforeend",
          `
              <div class="accordion-body introduction__accordion-body">
                <div class="introduction__accordion-right">
                  <span class="introduction__accordion-count"> -- </span>
                  <i class="fab fa-youtube introduction__accordion-icon"></i>
                  <a href="#" class="introduction__accordion-link">
                    هنوز جلسه‌ای آپلود نشده
                  </a>
                </div>
                <div class="introduction__accordion-left">
                  <span class="introduction__accordion-time">
                    00:00
                  </span>
                </div>
              </div>
          `
        );
      }

      // Show Course Comments
      if (course.comments.length) {
        course.comments.forEach((comment) => {
          commentsContentWrapper.insertAdjacentHTML(
            "beforeend",
            `
            <div class="comments__item">
              <div class="comments__question">
                  <div class="comments__question-header">
                      <div class="comments__question-header-right">
                          <span class="comments__question-name comment-name">${
                            comment.creator.name
                          }</span>
                          <span class="comments__question-status comment-status">
                          (${
                            comment.creator.role === "USER" ? "دانشجو" : "مدرس"
                          })
                              </span>
                          <span class="comments__question-date comment-date">${comment.createdAt.slice(
                            0,
                            10
                          )}</span>
                      </div>
                      <div class="comments__question-header-left">
                          <a class="comments__question-header-link comment-link" href="#">پاسخ</a>
                      </div>
                  </div>
                  <div class="comments__question-text">
                     
                      <p class="comments__question-paragraph comment-paragraph">
                        ${comment.body}
                      </p>
                  </div>
              </div>
              ${
                comment.answerContent
                  ? `
                    <div class="comments__ansewr">
                        <div class="comments__ansewr-header">
                            <div class="comments__ansewr-header-right">
                                <span class="comments__ansewr-name comment-name">
                               ${comment.answerContent.creator.name}
                                    </span>
                                <span class="comments__ansewr-staus comment-status">
                                  (${
                                    comment.answerContent.creator.role ===
                                    "USER"
                                      ? "دانشجو"
                                      : "مدرس"
                                  })
                                </span>
                                <span class="comments__ansewr-date comment-date">1401/04/21</span>
                            </div>
                            <div class="comments__ansewr-header-left">
                                <a class="comments__ansewr-header-link comment-link" href="#">پاسخ</a>
                            </div>
                        </div>
                        <div class="comments__ansewr-text">
                            <p class="comments__ansewr-paragraph comment-paragraph">
                              ${comment.answerContent.body}
                            </p>
                        </div>
                    </div>
                  `
                  : ""
              }
            </div>
        `
          );
        });
      } else {
        commentsContentWrapper.insertAdjacentHTML(
          "beforeend",
          `<div class="alert alert-danger">هنوز هیچ کامنتی برای این دوره ثبت نشده </div>`
        );
      }
    });
};

const getAndShowRelatedCourses = async () => {
  const courseShortName = getUrlParam("name");

  const courseRelatedCoursesWrapper = document.querySelector(
    ".course-info__courses-list"
  );

  const res = await fetch(
    `http://localhost:4000/v1/courses/related/${courseShortName}`
  );
  const relatedCourses = await res.json();
  if (relatedCourses.length) {
    relatedCourses.forEach((course) => {
      courseRelatedCoursesWrapper.insertAdjacentHTML(
        "beforeend",
        `
          <li class="course-info__courses-list-item">
            <a href="course.html?name=${course.shortName}" class="course-info__courses-link">
              <img src="http://localhost:4000/courses/covers/${course.cover}" alt="Course Cover" class="course-info__courses-img">
              <span class="course-info__courses-text">
                ${course.name}
              </span>
            </a>
        </li>
      `
      );
    });
  } else {
  }

  return relatedCourses;
};

const getSessionDetails = async () => {
  const courseShortName = getUrlParam("name");
  const sessionID = getUrlParam("id");
  const sessionVideoElem = document.querySelector(".episode-content__video");
  const courseSessionsListElem = document.querySelector(
    ".sidebar-topics__list"
  );

  const res = await fetch(
    `http://localhost:4000/v1/courses/${courseShortName}/${sessionID}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  const responseData = await res.json();

  sessionVideoElem.setAttribute(
    "src",
    `http://localhost:4000/courses/covers/${responseData.session.video}`
  );
  responseData.sessions.forEach((session) => {
    courseSessionsListElem.insertAdjacentHTML(
      "beforeend",
      `
        <li class="sidebar-topics__list-item">
          <div class="sidebar-topics__list-right">
            <svg class="svg-inline--fa fa-circle-play sidebar-topics__list-item-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM176 168V344C176 352.7 180.7 360.7 188.3 364.9C195.8 369.2 205.1 369 212.5 364.5L356.5 276.5C363.6 272.1 368 264.4 368 256C368 247.6 363.6 239.9 356.5 235.5L212.5 147.5C205.1 142.1 195.8 142.8 188.3 147.1C180.7 151.3 176 159.3 176 168V168z"></path></svg><!-- <i class="sidebar-topics__list-item-icon fa fa-play-circle"></i> Font Awesome fontawesome.com -->
            ${
              session.free
                ? `
                <a class="sidebar-topics__list-item-link" href="episode.html?name${courseShortName}&id=${session._id}">${session.title}</a>
              `
                : `
                <span class="sidebar-topics__list-item-link">${session.title}</span>
              `
            }
          </div>
          <div class="sidebar-topics__list-left">
          ${
            session.free
              ? `
                <span class="sidebar-topics__list-item-time">${session.time}</span>
                <i class="fa fa-lock"></i>

                `
              : `

                <span class="sidebar-topics__list-item-time">${session.time}</span>
              `
          }
          </div>
        </li>
    `
    );
  });
  return responseData;
};

const submitContactUsMsg = async () => {
  const nameInputElem = document.querySelector("#name");
  const emailInputElem = document.querySelector("#email");
  const phoneInputElem = document.querySelector("#phone");
  const bodyInputElem = document.querySelector("#body");

  const newContactUsInfos = {
    name: nameInputElem.value.trim(),
    email: emailInputElem.value.trim(),
    phone: phoneInputElem.value.trim(),
    body: bodyInputElem.value.trim(),
  };

  const res = await fetch(`http://localhost:4000/v1/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newContactUsInfos),
  });

  if (res.status === 201) {
    showSwal(
      "پیغام شما با موفقیت ارسال شد",
      "success",
      "ورود به پنل",
      (result) => {
        location.href = "index.html";
      }
    );
  } else {
    showSwal(
      "مشکلی در ارسال پیغام وجود دارد \n لطفا بعدا تست کنید",
      "error",
      "ای بابا",
      () => {}
    );
  }
};

const createNewNewsLetter = async () => {
  const newsLetterInput = document.querySelector("#news-letter-input");

  console.log(newsLetterInput);
  const newNewsLetterEmailObj = {
    email: newsLetterInput.value.trim(),
  };

  const res = await fetch(`http://localhost:4000/v1/newsletters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNewsLetterEmailObj),
  });

  console.log(res);

  if (res.ok) {
    showSwal(
      "با موفقیت در خبرنامه سبزلرن عضو شدید",
      "success",
      "متوجه شدم",
      () => {}
    );
  }
};

const globalSearch = async () => {
  const searchValue = getUrlParam("value");
  const coursesSearchResultWrapper =
    document.querySelector("#courses-container");
  const articlesSearchResultWrapper =
    document.querySelector("#articles-wrapper");

  const res = await fetch(`http://localhost:4000/v1/search/${searchValue}`);
  const data = await res.json();

  console.log(data);
  if (data.allResultCourses.length) {
    data.allResultCourses.forEach((course) => {
      coursesSearchResultWrapper.insertAdjacentHTML(
        "beforeend",
        `
      <div class="col-4">
        <div class="course-box">
          <a href="course.html?name=${course.shortName}">
            <img src=http://localhost:4000/courses/covers/${
              course.cover
            } alt="Course img" class="course-box__img" />
          </a>
          <div class="course-box__main">
            <a href="course.html?name=${
              course.shortName
            }" class="course-box__title">${course.name}</a>

            <div class="course-box__rating-teacher">
              <div class="course-box__teacher">
                <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                <a href="#" class="course-box__teacher-link">محمدامین سعیدی راد</a>
              </div>
              <div class="course-box__rating">
                <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
              </div>
            </div>

            <div class="course-box__status">
              <div class="course-box__users">
                <i class="fas fa-users course-box__users-icon"></i>
                <span class="course-box__users-text">${course.registers}</span>
              </div>
              <span class="course-box__price">${
                course.price === 0 ? "رایگان" : course.price.toLocaleString()
              }</span>
            </div>
          </div>

          <div class="course-box__footer">
            <a href="#" class="course-box__footer-link">
              مشاهده اطلاعات
              <i class="fas fa-arrow-left course-box__footer-icon"></i>
            </a>
          </div>

        </div>
      </div>
    `
      );
    });
  } else {
    coursesSearchResultWrapper.insertAdjacentHTML(
      "beforeend",
      `<div class="alert alert-danger">هیچ دوره ای برای جستجوی شما وجود ندارد</div>`
    );
  }

  if (data.allResultArticles.length) {
    data.allResultArticles.forEach((article) => {
      articlesSearchResultWrapper.insertAdjacentHTML(
        "beforeend",
        `
            <div class="col-4">
              <div class="article-card">
                <div class="article-card__header">
                  <a href="#" class="article-card__link-img">
                    <img src=http://localhost:4000/courses/covers/${article.cover} class="article-card__img" alt="Article Cover" />
                  </a>
                </div>
                <div class="article-card__content">
                  <a href="#" class="article-card__link">
                    ${article.title}
                  </a>
                  <p class="article-card__text">
                  ${article.description}
                  </p>
                  <a href="#" class="article-card__btn">بیشتر بخوانید</a>
                </div>
              </div>
            </div>
      `
      );
    });
  } else {
    articlesSearchResultWrapper.insertAdjacentHTML(
      "beforeend",
      `<div class="alert alert-danger">هیچ مقاله ای برای جستجوی شما وجود ندارد</div>`
    );
  }

  return data;
};

const submitComment = async () => {
  const commentTextareaElem = document.querySelector(
    ".comments__score-input-respond"
  );
  const commentScoreElem = document.querySelector("#comment-score");
  let score = 5;
  let courseShortName = getUrlParam("name");

  commentScoreElem.addEventListener(
    "change",
    (event) => (score = event.target.value)
  );

  const newCommentInfos = {
    body: commentTextareaElem.value.trim(),
    courseShortName,
    score,
  };

  const res = await fetch(`http://localhost:4000/v1/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCommentInfos),
  });

  console.log(res);

  if (res.ok) {
    showSwal(
      "کامنت مورد نظر شما با موفقیت ثبت شد",
      "success",
      "خیلی هم عالی",
      () => {}
    );
  }
};

export {
  showUserNameInNavbar,
  renderTopbarMenus,
  getAndShowAllCourses,
  getAndShowPopularCourses,
  getAndShowPresellCourses,
  getAndShowArticles,
  getAndShowNavbarMenus,
  getAndShowCategoryCourses,
  insertCourseBoxHtmlTemplate,
  coursesSorting,
  getCourseDetails,
  getAndShowRelatedCourses,
  getSessionDetails,
  submitContactUsMsg,
  createNewNewsLetter,
  globalSearch,
  submitComment,
};
