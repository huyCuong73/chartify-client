export const INIT_STATE = {
    course:{
        isLoading:false,
        courses: [],
        error:false
    },
    searchItems:{
        isFetching: false,
        items:[]
    },
    socket: null,
    exercises:{
        isFetching: false,
        exercises:[],
    }, 
    user:{
        isLoading:false,
        user: JSON.parse(localStorage.getItem("user")) || null,
        err:null
    }
    
}