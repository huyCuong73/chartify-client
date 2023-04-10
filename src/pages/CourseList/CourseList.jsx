
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
import { updateLearningProgress } from "../../api/userAPI";

const CourseList = () => {

    const user = useSelector(state => state.user.user)
    const courses = useSelector(state => state.courses.courses)
    const [courseList, setCourseList] = useState(null)
    
    useEffect(() => {
        if(courses){
            setCourseList(courses)
        }
    }, [courses])


    const creteria = ["Tất cả", "mua", "bán", "đã đọc", "chưa đọc", "đã lưu"]
    const [filter, setFilter] = useState(1)    
                                                                    
    const handleUpdateCoursesProgess = (courseId) => {
        updateLearningProgress({
            userId: user._id,
            courseId
        })
    }


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
                    <span>Lý thuyết cơ bản</span>
                    <p>Hãy .. .. . .. . </p>
                </div>

                <div className={styles.filter}>
                    {
                        creteria.map( (cre, i) => 
                            
                            <div className={filter !== i+1 ? styles.creterion : styles.selected} onClick = {() => {
                                setFilter(i+1)
                                if(cre === "Tất cả")
                                    setCourseList(courses)
                                if(cre === "mua")
                                    setCourseList(courses.filter(course => course.category === "buy"))
                                if(cre === "sell")
                                    setCourseList(courses.filter(course => course.category === "bán"))
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
                            <div className={styles.listItem} onClick = { () => {
                                handleUpdateCoursesProgess(course._id)
                            }}>
                                <BookmarkAddIcon className={styles.markIcon}/>
                                <img src = {course.thumnailImg}></img>
                                <div className={styles.courseTitle}>
                                    <span>
                                        {course.title}
                                    </span>
                                </div>
                                <div className = {styles.courseDetail}>
                                    <div className={styles.title}>
                                        <span>
                                            {course.title}
                                        </span>
                                    </div>
                                    <div className = {styles.des}>
                                        {course.des}
                                    </div>
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
