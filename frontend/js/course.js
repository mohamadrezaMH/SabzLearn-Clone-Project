import { getAndShowRelatedCourses, getCourseDetails } from "./funcs/shared.js";

window.addEventListener('load', () => {
    getCourseDetails()
    getAndShowRelatedCourses()
})