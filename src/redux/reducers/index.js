import { combineReducers } from "redux";
import search from './search'
import socket from './socket'
import exercises from './exercises'
import courses from './courses'
import user from './user'

export default combineReducers({
     search, socket, exercises, courses, user
})