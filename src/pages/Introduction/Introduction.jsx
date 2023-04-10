import React from 'react';

import styles from "./introduction.module.scss"
import Navbar from '../../components/NavBar/NavBar';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Introduction = () => {
    return (
        <div className={styles.container}>
            <Navbar></Navbar>
            <div className = {styles.title}>
                <span>
                    Dịch vụ tư vấn và khuyến nghị của Chartify
                </span>
            </div>
            <div className={styles.body}>
                <div className={styles.text}>
                    <h3>Quyền lợi của khách hàng:</h3>
                    <div className={styles.bullet}>
                        <FiberManualRecordIcon className = {styles.dot}/>  Nhận định thị trường hàng ngày
                    </div>
                    <div className={styles.bullet}>
                        <FiberManualRecordIcon className = {styles.dot}/> Cập nhật và phân vĩ mô thường xuyên
                    </div>
                    <div className={styles.bullet}>
                        <FiberManualRecordIcon className = {styles.dot}/> Phân tích những ngành có tiềm năng tăng trưởng tốt trong trương lai 
                    </div>
                    <div className={styles.bullet}>
                        <FiberManualRecordIcon className = {styles.dot}/> Nhân viên tư vấn 1:1
                    </div>
                    <div className={styles.bullet}>
                        <FiberManualRecordIcon className = {styles.dot}/> Không cần trả phí chỉ cần mở tài khoản VPS theo link bên dưới
                    </div>
                    <h3>Về chúng tôi:</h3>
                    <div className={styles.bullet}>
                        <FiberManualRecordIcon className = {styles.dot}/> Trường phái đầu tư: đầu tư tăng trưởng theo CANSLIM
                    </div>
                    <div className={styles.bullet}>
                        <FiberManualRecordIcon className = {styles.dot}/> Kinh nghiệm đầu tư trên 10 năm
                    </div>
                    <div className={styles.bullet}>
                        <FiberManualRecordIcon className = {styles.dot}/> Phân tích những ngành có tiềm năng tăng trưởng tốt trong trương lai 
                    </div>
                    <div className={styles.bullet}>
                        <FiberManualRecordIcon className = {styles.dot}/> Đội ngũ phân tích tích chuyên nghiệp
                    </div>
                    <div className={styles.bullet}>
                        <FiberManualRecordIcon className = {styles.dot}/> Kênh youtube: https://www.youtube.com/@TVITuVanChungKhoan
                    </div>
                </div>
                <div className = {styles.img}>
                    <img src="/broker.png" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Introduction;



