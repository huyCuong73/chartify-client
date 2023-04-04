import {INIT_STATE} from "../initialState/initialState"

export default function exercisesReducers(state = INIT_STATE.exercises, action){
    switch(action.type){
        case "GET_EXERCISES_REQUEST":
            return{
                ...state,
                isLoading:true,
            }
    
        case "GET_EXERCISES_REQUEST_NON_USER":
            return{
                ...state,
                isLoading:true,
            }

        case "GET_EXERCISES_SUCCESS":
            
            return{
                ...state,
                isLoading: false,
                exercises: action.exercises
            }
            
        case "GET_EXERCISES_FAILURE":
            return {
                error: true,   
            }

        default:
            return {...state}

            
    }
}