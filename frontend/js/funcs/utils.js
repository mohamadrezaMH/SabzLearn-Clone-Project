const showSwal = (title, icon, buttons, callback) => {
  swal({
    title,
    icon,
    buttons,
  }).then((result) => callback(result));
};

const saveIntoLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  return JSON.stringify(localStorage.getItem(key));
};

const getToken = () => {
  const userInfos = JSON.parse(localStorage.getItem("user"));
  return userInfos ? userInfos.token : null;
};

const isLogin = () => {
  const userInfos = localStorage.getItem("user");
  return userInfos ? true : false;
};

const getUrlParam = (key) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
};

const searchInArray = (array, searchProperty, searchValue) => {
  let outputArray = array.filter((item) =>
    item[searchProperty].includes(searchValue)
  );

  return outputArray;
};

const paginateItems = (
  array,
  itemsPerPage,
  paginateParentElem,
  currentPage
) => {
  paginateParentElem.innerHTML = "";
  let endIndex = itemsPerPage * currentPage;
  let startIndex = endIndex - itemsPerPage;
  let paginatedItems = array.slice(startIndex, endIndex);
  let paginatedCount = Math.ceil(array.length / itemsPerPage);

  for (let i = 1; i < paginatedCount + 1; i++) {
    paginateParentElem.insertAdjacentHTML(
      "beforeend",
      `
        <li class="courses__pagination-item">
          <a href="#" class="courses__pagination-link">
            ${i}
          </a>
        </li>
    `
    );
  }
  return paginatedItems;
};

export {
  showSwal,
  saveIntoLocalStorage,
  getFromLocalStorage,
  getToken,
  isLogin,
  getUrlParam,
  searchInArray,
  paginateItems,
};
