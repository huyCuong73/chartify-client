import {INIT_STATE} from "../initialState/initialState"

export default function exercisesReducers(state = INIT_STATE.exercises, action){
    
    switch(action.type){
        case "GET_COURSES_REQUEST":
            return{
                ...state,
                isLoading:true,
            }
    
        case "GET_COURSES_REQUEST_NON_USER":
            return{
                ...state,
                isLoading:true,
            }

        case "GET_COURSES_SUCCESS":
            return{
                ...state,
                isLoading: false,
                courses: action.payload
            }
            
        case "GET_COURSES_FAILURE":
            return {
                error: true,   
            }

        default:
            return {...state}

            
    }
}