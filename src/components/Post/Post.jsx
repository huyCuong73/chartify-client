import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./post.module.scss"

const Post = ({post}) => {
    return (
        <Link to = {`/posts/${post._id}`} state={{ data: post }} >
            <div className={styles.post}>
                <img src= {post.thumnailImg} className={styles.thumnail}></img>

                    <div className={styles.postDes}>
                        <div className={styles.title}> 
                            <p>
                                {post.title}
                            </p>
                        </div>
                        <p className={styles.des}>
                            {post.des}
                        </p>
                        <div className={styles.date}>
                            <span>{post.date}</span>
                        </div>
                    </div>
                
            </div>
        </Link>
    );
}

export default Post;
