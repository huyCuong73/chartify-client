
import styles from "./courseList.module.scss"
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import FlagIcon from '@mui/icons-material/Flag';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import React, { useEffect, useState } from 'react';
import Navbar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import Widget from "../../components/Widget/Widget";
import { useDispatch, useSelector } from "react-redux";
import { getCoursesRequest } from "../../redux/actions/courses";


const CourseList = () => {

    const courses = useSelector(state => state.courses.courses)
    const [courseList, setCourseList] = useState(null)
    
    useEffect(() => {
        if(courses){
            setCourseList(courses)
        }
    }, [courses])


    const creteria = ["All", "sell", "buy", "already read", "unread"]
    const [filter, setFilter] = useState(1)    

    if(!courses){
        return (
            <Navbar />
        )
    }

    return (
        <div className = {styles.container}>
            <Navbar/>

            <div className= {styles.courseContainer}>
                <div className={styles.intro}>
                    <h2>Course list</h2>
                    <span>This is a list of chart courses on this site. Choose your favorite course and study how to read charts!</span>
                </div>

                <div className={styles.filter}>
                    {
                        creteria.map( (cre, i) => 
                            
                            <div className={filter !== i+1 ? styles.creterion : styles.selected} onClick = {() => {
                                setFilter(i+1)
                                // setCourseList(courses.filter(course => course.category == cre))
                                // setCourseList([...courses.filter(course => course.category === "buy")]);

                                if(cre === "All")
                                    setCourseList(courses)
                                if(cre === "sell")
                                    setCourseList(courses.filter(course => course.category === "sell"))
                                if(cre === "buy")
                                    setCourseList(courses.filter(course => course.category === "buy"))
                            }} >
                                <span>{cre}</span>
                            </div>
                        )
                    }
                    {/* <div className={styles.creterion}
                        onClick = {() => {
                            courses.filter(course => course.category === "")
                        }}
                    >All</div>
                    <div className={styles.creterion}
                        onClick = {() => {
                            console.log(courses.filter(course => course.category === "sell"));
                        }}
                    >Sell</div>
                    <div className={styles.creterion}
                        onClick = {() => {
                            console.log(courses.filter(course => course.category === "buy"));
                        }}
                    >Buy</div>
                    <div className={styles.creterion}>Already read</div>
                    <div className={styles.creterion}>Unread</div> */}
                </div>

                <div className={styles.listContainer}>
                    {
                        courseList && courseList.map((course) => 
                        <Link to = {"/course/" + course._id}>
                            <div className={styles.listItem}>
                                <BookmarkAddIcon className={styles.markIcon}/>
                                <img src = {course.thumnailImg}></img>
                                <div className={styles.courseTitle}>
                                    <span>
                                        {course.title}
                                    </span>
                                </div>
                            </div>
                        </Link>
                        
                        )
                    }
                </div>
            </div>
            <div className= {styles.widgetWrapper}>
                <Widget />
            </div>
        </div>

);
}

export default CourseList;
