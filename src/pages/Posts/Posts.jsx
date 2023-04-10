import React, { useEffect, useState } from 'react';
import Navbar from '../../components/NavBar/NavBar';
import Post from '../../components/Post/Post';
import Widget from '../../components/Widget/Widget';

import { getPost } from '../../api/postAPI';

import styles from "./posts.module.scss"
import FilterListIcon from '@mui/icons-material/FilterList';

const Posts = ({socket}) => {

    const [postList, setPostList] = useState([])
    const [creteria, setCreteria] = useState("Tất cả")
    const [openFilterCreteria, setOpenFilterCreteria] = useState(true)

    useEffect( () => {
        const fetch = async() => {
            const res = await getPost()
            setPostList(res.data)
        }
        fetch()
    },[])

    if(!postList) {
        return (
            <Navbar></Navbar>
        )
    }

    return (
        <div>
            <Navbar />

            <div className={styles.container}>
                <div className={styles.postContainer}>
                    <div className = {styles.filter}>
                        <div className={styles.filterIconContainer}>
                            <span>{creteria}</span>
                            <FilterListIcon />

                            {
                                openFilterCreteria
                                &&
                                <div className = {styles.creterion}>
                                    <div>Tất cả</div>
                                    <div onClick={() => {
                                        setPostList(postList.filter(post => post.category === "evaluate"))
                                    }}>Nhận định thị trường</div>
                                    <div onClick={() => {
                                        // setPostList(postList.filter(post => post.category === "share"))
                                        console.log(postList.filter(post => post.category === "share"));
                                    }}>Chuyên gia phân tích</div>
                                </div>
                            }
                        </div>
                    </div>
                    {
                        [...postList].map((post, i) => 
                            <Post post = {post} key = {i}/>
                        )
                    }
                </div>
              
                <div className={styles.widgetWrapper}>
                    <Widget />
                </div>
                
            </div>

        </div>
    );
}

export default Posts;
