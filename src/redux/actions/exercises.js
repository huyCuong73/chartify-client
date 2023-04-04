export const getExercisesRequest = (payload) => ({
    type: "GET_EXERCISES_REQUEST",
    payload
});
export const getExercisesRequestNonUser = () => ({
    type: "GET_EXERCISES_REQUEST_NON_USER",
});
export const getExercisesSuccess = (payload) => ({
    type: "GET_EXERCISES_SUCCESS",
    exercises:payload
});
export const getExercisesFailure = () => ({
    type: "GET_EXERCISES_FAILURE",

});
  
  
  
