import { Route, Routes, Navigate, useParams,  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import CourseList from './pages/CourseList/CourseList';

import Exercise from './pages/Exercise/Exercise';
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Course from './pages/Course/Course'
import Posts from './pages/Posts/Posts';
import DisplayPost from './pages/DisplayPost/DisplayPost';
import Login from './pages/Login/Login';
import Practice from './pages/Practice/Practice';
import Profile from './pages/Profile/Profile';
import {io} from "socket.io-client"
import { useEffect, useState } from 'react';
import { socketRequest } from './redux/actions/socket';
import { getExercisesRequest, getExercisesRequestNonUser } from './redux/actions/exercises';
import { getCoursesRequest } from './redux/actions/courses';
import { url } from './api/api';
import Introduction from './pages/Introduction/Introduction';


function App() {												

	const dispatch = useDispatch()
	const user =  useSelector( state => state.user.user)
	const socket =  useSelector( state => state.socket)

	useEffect(() => {
		if(user){
			dispatch(socketRequest(io(url)))
			dispatch(getExercisesRequest({exerciseNo :user.progress.practice}))
		}else{
			dispatch(getExercisesRequestNonUser())
		}
	},[user, dispatch])

	useEffect(() => {
		if(socket && user){
			socket.emit("newUser", user._id)
		}
	},[socket])

    useEffect(() => {
        dispatch(getCoursesRequest())        
    },[dispatch])

	return (
		<Routes>
			<Route path="/" element={<Home/>} />
			<Route path="/profile/:userId" element={<Profile/>} />
			<Route path="/practice" element={<Practice/>} />
			<Route path="/practice/exercise/:order" element={<Exercise/>} />
			<Route path="/register" element={!user ? <Register /> : <Navigate replace to = "/" />} />
			<Route path="/login" element={!user ? <Login /> : <Navigate replace to = "/" />} />
			<Route path="/course-list" element={<CourseList/>} />
			<Route path="/course/:id" element={<Course/>} />
			<Route path="/posts" element={<Posts/>} />
			<Route path="/posts/:id" element={<DisplayPost/>} />
			<Route path="/profile/:id" element={<Profile/>} />
			<Route path="/about-us" element={<Introduction/>} />
		</Routes>
	);
}

export default App;
