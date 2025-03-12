import { getAllCourses, insertCourseBoxHtmlTemplate } from "./funcs/shared.js";
import { paginateItems, getUrlParam, addParamToUrl } from "./funcs/utils.js";

window.addParamToUrl = addParamToUrl

window.addEventListener("load", () => {
  getAllCourses().then((courses) => {
    const coursesPagintionWrapperElem =
      document.querySelector("#courses-pagintion");
    const coursesWrapperElem = document.querySelector("#courses-wrapper");

    const currentPage = getUrlParam("page");

    let shownCourses = paginateItems(
      [...courses],
      3,
      coursesPagintionWrapperElem,
      currentPage
    );
    insertCourseBoxHtmlTemplate([...shownCourses], "row", coursesWrapperElem);
  });
});
