import { INIT_STATE } from "../initialState/initialState";

const authReducer = (state = INIT_STATE.user, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return {
                ...state,
                user: null,
                isFetching: true,
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload,
                isFetching: false,
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                user: null,
                isFetching: false,
                error: action.payload,
            };

        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                user: null,
                isFetching: false,
                error: false,
            };

        case "UPDATE_PRACTICE_PROGRESS_REQUEST":
            return {
                ...state,
                isFetching: true,
                error: null,
            };
        case "UPDATE_PRACTICE_PROGRESS_SUCCESS":
            return {
                ...state,
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "UPDATE_PRACTICE_PROGRESS_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };

        case "UPDATE_LEARNING_PROGRESS_REQUEST":
            return {
                ...state,
                isFetching: true,
                error: null,
            };
        case "UPDATE_LEARNING_PROGRESS_SUCCESS":
            return {
                ...state,
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "UPDATE_LEARNING_PROGRESS_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };

        case "UPDATE_USER_START":
            return {
                ...state,
                user: null,
                isFetching: true,
                error: false,
            };
        case "UPDATE_USER_SUCCESS":
            return {
                ...state,
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "UPDATE_USER_FAILURE":
            return {
                ...state,
                user: null,
                isFetching: false,
                error: true,
            };

        default:
            return { ...state };
    }
};

export default authReducer;
