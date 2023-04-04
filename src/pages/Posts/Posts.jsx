import React, { useEffect, useState } from 'react';
import Navbar from '../../components/NavBar/NavBar';
import Post from '../../components/Post/Post';
import Widget from '../../components/Widget/Widget';

import { getPost } from '../../api/postAPI';

import styles from "./posts.module.scss"

const Posts = ({socket}) => {

    const [postList, setPostList] = useState([])

    useEffect( () => {
        const fetch = async() => {
            const res = await getPost()
            setPostList(res.data)
        }
        fetch()
    },[])

    return (
        <div>
            <Navbar />

            <div className={styles.container}>
                <div className={styles.postContainer}>
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
