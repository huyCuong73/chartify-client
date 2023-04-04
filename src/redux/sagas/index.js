import {takeLatest, call, put, takeEvery} from 'redux-saga/effects'
import { loginStart } from '../../api/authAPI';
import { getCourses } from '../../api/courseAPI';
import { getAllExercises } from '../../api/exerciseAPI';
import { getUser, updatePracticeProgress } from '../../api/userAPI';
import * as authActions from '../actions/user'
import { getCoursesFailure, getCoursesSuccess } from '../actions/courses';
import { getExercisesFailure, getExercisesSuccess } from '../actions/exercises';
import { updateLearningProgressSuccess, updatePracticeProgressFailure } from '../actions/user';
// import * as movieActions from '../actions/movie'
// import * as ratingActions from '../actions/rating'
// import * as searchActions from '../actions/search'
// import { loginStart, fetchMovie, postRating, searchMovies} from '../../api'
// import { getRatingRequest } from '../actions/rating'


const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
}

const updateUser = (userUpdated) => {
    localStorage.setItem("user", JSON.stringify(userUpdated));
}

function* loginRequestSaga(action){
    try {    
        
        const userCre = yield call(loginStart, action.payload)
        
        const user = yield call(getUser, {email: userCre.data.email})

        setUser({...user.data,accessToken:userCre.data.accessToken})

        yield put(authActions.loginSuccess({...user.data,accessToken:userCre.data.accessToken}))
        
    } catch (err){
        yield put(authActions.loginFailure(err.response.data))
    }
}

function* updatePracticeRequestSaga(action){

    try {    
        
        const userUpdated = yield call(updatePracticeProgress, action.payload)
        yield call(updateUser, userUpdated.data)
        yield put(updateLearningProgressSuccess(userUpdated.data))
        
    } catch (err){
        yield put(updatePracticeProgressFailure())
    }
}

function* getExercisesSaga(action){
    try {
        const exercises = yield call(getAllExercises,action.payload)
        yield put(getExercisesSuccess(exercises.data))
    } catch(err){
        yield put(getExercisesFailure(err))
    }
}

function* getExercisesNonUerSaga(){
    try {
        const exercises = yield call(getAllExercises)
        yield put(getExercisesSuccess(exercises.data))
    } catch(err){
        yield put(getExercisesFailure(err))
    }
}

function* getCoursesSaga(){
    try {
        const courses = yield call(getCourses)
        yield put(getCoursesSuccess(courses.data))
    } catch(err){
        yield put(getCoursesFailure())
    }
}


function* mySaga(){

    yield takeLatest("LOGIN_REQUEST",loginRequestSaga)
    yield takeLatest("UPDATE_PRACTICE_PROGRESS_REQUEST",updatePracticeRequestSaga)
    yield takeLatest("GET_EXERCISES_REQUEST",getExercisesSaga)
    yield takeLatest("GET_EXERCISES_REQUEST_NON_USER",getExercisesNonUerSaga)
    yield takeLatest("GET_COURSES_REQUEST",getCoursesSaga)
    // yield takeLatest("GET_MOVIE_REQUEST",getMovieRequestSaga)
    // // yield takeLatest("GET_RATING_REQUEST",postRatingRequestSaga )
    // yield takeLatest("GET_SEARCH_REQUEST",searchRequestSaga )
}

export default mySaga