import styles from "./home.module.scss"

import Navbar from "../../components/NavBar/NavBar";
// import image from "public/homept.png"

import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
    const user = useSelector(state => state.user.user)

    return (
        <div className={styles.container}>
            <Navbar />
            <img className={styles.pcImage} src="/homept.png"></img>
            <img className={styles.mobileImage} src="/homefinal.png"></img>
            <div className={styles.text}>
                <span className={styles.span1}>Chào mừng đến với</span>
                <span className={styles.span2}>CHARTIFY</span>
                <span className={styles.span3}>Hãy luyện tập khả năng phân tích biểu đồ cùng chúng tôi</span>
                <Link to ="/practice">
                    <div className={styles.startButton}>
                        Luyện tập ngay
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Home;
