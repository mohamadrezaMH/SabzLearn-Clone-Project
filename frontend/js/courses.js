import { getAllCourses, insertCourseBoxHtmlTemplate } from "./funcs/shared.js";
import { paginateItems, getUrlParam, addParamToUrl } from "./funcs/utils.js";

window.addParamToUrl = addParamToUrl  //binding

window.addEventListener("load", () => {
  getAllCourses().then((courses) => {
    const coursesPaginationWrapperElem =
      document.querySelector("#courses-pagination");
    const coursesWrapperElem = document.querySelector("#courses-wrapper");

    const currentPage = getUrlParam("page");

    let shownCourses = paginateItems(
      [...courses],
      3,
      coursesPaginationWrapperElem,
      currentPage
    );
    insertCourseBoxHtmlTemplate([...shownCourses], "row", coursesWrapperElem);
  });
});
