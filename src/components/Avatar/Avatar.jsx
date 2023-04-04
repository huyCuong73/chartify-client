import React from 'react';
import { useSelector } from 'react-redux';
import styles from "./avatar.module.scss"

const Avatar = ({user}) => {
    if(!user){
        return
        <></>
    }

    const userName = user.firstName
    const defaultBackground = ["blue", "red", "purple", "orange", "green", "pink", "brown"]
    const i = user.defaultBackground

    return (
            <div style={{backgroundColor: defaultBackground[i]}} className={styles.avatar}>
                {
                    user.picture === ""
                    ?
                    <span>
                        {userName[0].toUpperCase()}
                    </span>
                    :
                    <img src={user.picture} alt="" />
                }
                
            </div>
    );
}

export default Avatar;
