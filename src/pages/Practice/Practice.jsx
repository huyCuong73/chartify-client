import React, { useEffect, useState } from 'react';
import {useSelector} from "react-redux"
import { Link } from 'react-router-dom';
import { getAllExercises } from '../../api/exerciseAPI';
import CommentSection from '../../components/CommentSection/CommentSection';
import Navbar from '../../components/NavBar/NavBar';
import Widget from '../../components/Widget/Widget';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import styles from "./practice.module.scss"

const Practice = () => {

    const user =  useSelector( state => state.user.user)
    const exercises =  useSelector( state => state.exercises.exercises)


    const [exerciseList, setExerciseList] = useState([])
    const [displayExercise, setDisplayExercise] = useState([])
    const [page, setPage] = useState(0)
    const [pageCount, setPageCount] = useState(1)
    const [openPageList, setOpenPageList] = useState(false)

    useEffect(() => {

        if(exercises && user){
            if(user.progress.practice < 4){
                setExerciseList(exercises.slice(0,4))
            }else{
                setExerciseList(exercises.slice(0,user.progress.practice + 1))
            }
        }

        if(!user){
            setExerciseList(exercises.slice(0,4))
        }
    },[exercises, user])

    useEffect(() => {
        if(exerciseList){
            setPageCount(Math.ceil(exerciseList.length/9))
        }
    },[exerciseList])

    useEffect(() => {

        if(exerciseList){
            const list = exerciseList.slice(page*9, (page+1)*9)
            setDisplayExercise([...list])
        }
    }, [page, exerciseList])
   
    if(!displayExercise){
        return(
            <Navbar />
        )
    }

    return (
        <div className={styles.container}>
            <Navbar />

            <div className={styles.exerciseContainer}>
                <div className={styles.intro}>
                    <h2>Bài tập luyện tập</h2>
                    <span>Hãy áp dụng lý thuyết đã học và ...</span>
                </div>

                <div className={styles.listContainer}>
                    {
                        displayExercise.map((exercise) => 
                        <Link to = {`/practice/exercise/${exercise.order}`} state={{ order: exercise.order }}>
                            <div className={styles.listItem}>
                                <img src = {exercise.imageURL}></img>
                                <div className={styles.courseTitle}>
                                    <span>
                                    Reversal at the 25-day moving average line sdc sdv dsv
                                    </span>
                                </div>
                            </div>
                        </Link>
                        
                        )
                    }
                </div>

                <div className={styles.pageControl}>
                    <div className={styles.pageAction} onClick={() => {
                        setPage(pre => pre - 1)
                        setOpenPageList(false)
                    }}>Trang trước</div>
                    <div className={styles.currentPage} >
                        <div>{page + 1}</div>
                        
                        {
                        openPageList 
                        && 
                        <div className={styles.pageList}>
                            {
                            pageCount
                            &&
                            [...Array(4)].map( (pageNumber, i) => (
                                <div className={ (i === page) ? styles.pageNumberSelected : styles.pageNumber} onClick={() => {
                                    setPage(i)
                                    setOpenPageList(false)
                                }}>{i+1}</div>
                            ))
                            }
                        </div>
                        }
                    </div>
                    {
                        !openPageList && <ArrowDropUpIcon className={styles.arrow} onClick={() => setOpenPageList(!openPageList)}/>
                    }
                    
                    {
                        openPageList && <ArrowDropDownIcon className={styles.arrow} onClick={() => setOpenPageList(!openPageList)}/>
                    }
                    <div className={styles.pageAction} onClick={() => {
                        setPage(pre => pre + 1)
                        setOpenPageList(false)
                    }}>Trang sau</div>
                </div>
            </div>

            <div className={styles.widgetWrapper}>
                <Widget />
            </div>
            
        </div>
    );
}

export default Practice;
