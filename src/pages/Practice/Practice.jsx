import React, { useEffect, useState } from 'react';
import {useSelector} from "react-redux"
import { Link } from 'react-router-dom';
import { getAllExercises } from '../../api/exerciseAPI';
import CommentSection from '../../components/CommentSection/CommentSection';
import Navbar from '../../components/NavBar/NavBar';
import Widget from '../../components/Widget/Widget';

import styles from "./practice.module.scss"

const Practice = () => {

    const user =  useSelector( state => state.user.user)
    const exercises =  useSelector( state => state.exercises.exercises)


    const [exerciseList, setExerciseList] = useState([])
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
    },[exercises])

   
   

    return (
        <div className={styles.container}>
            <Navbar />

            <div className={styles.exerciseContainer}>
                <div className={styles.intro}>
                    <h2>Exercise list</h2>
                    <span>This is a list of chart courses on this site. Choose your favorite course and study how to read charts!</span>
                </div>

                <div className={styles.listContainer}>
                    {
                        exerciseList.map((exercise) => 
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
            </div>

            <div className={styles.widgetWrapper}>
                <Widget />
            </div>
            
        </div>
    );
}

export default Practice;
