import DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react';
import "./fireAnt.css"

import styles from "./widget.module.scss"
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getNewUsers } from '../../api/userAPI';
import Avatar from '../Avatar/Avatar';

const Widget = () => {

    const user = useSelector(state => state.user.user)
    const exercises = useSelector(state => state.exercises.exercises)
    const [practiceProgress, setPracticeProgress] = useState(0)
    const [newUsers, setNewUsers] = useState([])

    const location = useLocation();
	const { pathname } = location;
	const splitLocation = pathname.split("/");

    const FireAnt = window.FireAnt

    
    useEffect(() => {
        if(user && exercises){
            let percentage = user.progress.practice/exercises.length * 100
            setPracticeProgress(parseFloat (percentage.toFixed(1)))
        }
    },[user, exercises])

    useEffect(() => {
        getNewUsers()
            .then(res => setNewUsers(res.data))
    })

    useEffect(() => {
        if(splitLocation[1] === "posts"){
            new FireAnt.MarketsWidget({
                "container_id": "fan-quote-2",
                "locale": "vi",
                "price_line_color": "#71BDDF",
                "grid_color": "#999999",
                "label_color": "#999999",
                "width": "100%",
                "height": "300px"
            })
        }
    },[])
    

    return (
        <div className={styles.widget}>
            {
                (splitLocation[1] !== "posts")
                &&
                <div className={styles.status}>
                    <div className={styles.text}>Tiến trình học tập của bạn</div>
                    <div className={styles.record}>
                        <div className={styles.practiceRecord}>
                            <div style={{width:`${practiceProgress}%`}} className={styles.userPractice}></div>
                            <div className={styles.recordTitle}>
                                <span>
                                    Thực hành
                                </span>
                            </div>
                            <span className={styles.percentage}>
                                {practiceProgress}%
                            </span>
                        </div>
                        <div className={styles.courseRecord}>
                            <div className={styles.userPractice}></div>
                                <div className={styles.recordTitle}>
                                    <span>
                                        Lý thuyết
                                    </span>
                                </div>
                                <span className={styles.percentage}>
                                    80%
                                </span>
                            </div>
                    </div>
                </div>
            }

        
            <div id="fan-quote-2" ></div>
        
            
            <div className={styles.contact}>
                <div className={styles.text}>
                    Liên hệ tư vấn
                </div>
                <div className={styles.contactInfo}>
                    <span>
                        Mở tài khoản chứng khoán tại vps và nhận được sự tư vấn từ chúng tôi
                    </span>
                </div>

                <div className={styles.contactInfo}>
                    <span>
                        Nhóm Zalo
                    </span>
                </div>

                <div className={styles.contactInfo}>
                    <span>
                        Liên hệ Zalo
                    </span>
                </div>
            </div>

            <div className={styles.greeting}>
                <div className={styles.text}>
                    Chào mừng các thành viên mới:
                </div>
                <div className={styles.newUsers}>
                    {
                        newUsers
                        &&
                        newUsers.map((newUser) => 
                            <div className={styles.newUser}>
                                <div className={styles.avatar}>
                                    <Avatar user = {newUser}/>
                                                                        
                                </div>
                                <div className={styles.newUserName}>
                                    <span>{newUser.lastName}</span> <span>{newUser.firstName}</span>
                                </div>
                            </div>
                        )
                    }
                    
                </div>

                <div className={styles.text}>
                    đã tham gia vào cộng đồng Chartify
                </div>
            </div>

    </div>
    );
}

export default Widget;
