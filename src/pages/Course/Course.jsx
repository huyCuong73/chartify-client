import DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentSection from '../../components/CommentSection/CommentSection';
import Navbar from '../../components/NavBar/NavBar';
import styles from './course.module.scss'

// import A from "../../assets/a.jsx"
// const template = { __html: a };

const Course = () => {
    const user = useSelector(state => state.user.user)
    const courses = useSelector(state => state.courses.courses)
    const param = useParams()
    const [course, setCourse] = useState(null)
    
    useEffect(() => {
        if(user){
            const userLearningProgress = user.progress
            console.log(userLearningProgress);
        }
    }, [param.id, user])


    useEffect(() => {
        if(courses){
            setCourse(courses.find((course) => course._id === param.id))
        }
    },[param.id, courses])
    
    if(!course){
        return(
            <Navbar/>
        )
    }

    return (
        <div>
        <div className={styles.container}>
            <Navbar></Navbar>
            <h1>{course.title}</h1>
            <div className={styles.tiny} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(course.content)}}/>
            <div className={styles.commentSection}>
                <CommentSection pageId = {course._id}/>
            </div>
        </div>
        </div>
    );
}

export default Course;
