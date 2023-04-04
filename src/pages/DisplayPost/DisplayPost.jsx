import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { useLocation, useParams } from 'react-router-dom';
import { getPostDetail } from '../../api/postAPI';
import Navbar from '../../components/NavBar/NavBar';


import styles from "./displayPost.module.scss"
import CommentSection from '../../components/CommentSection/CommentSection';


const DisplayPost = () => {

    const params = useParams();
    const [postDetail, setPostDetail] = useState({})

    useEffect(() => {
        const fetchPost = async () => {
            getPostDetail(params.id)
                .then( res => (setPostDetail(res.data)))
                .catch( err => console.log(err))
        }

        fetchPost()
    },[])

    return (
        <div className={styles.container}>
            <Navbar></Navbar>
            <h1>{postDetail.title}</h1>
            <div className={styles.tiny} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(postDetail.content)}}/>
            <div className={styles.commentSection}>
                <CommentSection pageId = {postDetail._id}/>
            </div>
        </div>
    );
}

export default DisplayPost;
