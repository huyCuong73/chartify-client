export const getPostRequest = () => ({
    type: "GET_POST_REQUEST",
});
export const getPostSuccess = (payload) => ({
    type: "GET_POST_SUCCESS",
    movie:payload
});
export const getPostFailure = () => ({
    type: "GET_POST_FAILURE",
});
  
  
  
