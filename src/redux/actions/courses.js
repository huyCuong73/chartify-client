export const getCoursesRequest = () => ({
    type: "GET_COURSES_REQUEST",
});
export const getCoursesSuccess = (payload) => ({
    type: "GET_COURSES_SUCCESS",
    payload:payload
});
export const getCoursesFailure = () => ({
    type: "GET_COURSES_FAILURE",
});
  
  
  
