import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../components/Avatar/Avatar';
import Navbar from '../../components/NavBar/NavBar';
import styles from "./profile.module.scss"

import "../../firebase";
import {
    getStorage,
    ref,
    uploadBytes,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { updateUserInfo } from '../../api/userAPI';

const Profile = () => {

    const user = useSelector(state => state.user.user)
    const userInfo = JSON.parse(localStorage.getItem("user"))
    const [picture, setPicture] = useState(null); 
    const [pictureSelected, setPictureSelected] = useState(null); 
    const [userFirstName, setUserFirstName] = useState(null); 
    const [userLastName, setUserLastName] = useState(null); 
    const [userPicture, setUserPicture] = useState(null); 
    const [isUploadingPicture, setLoadingPicture] = useState(false); 
    const [loadingProgress, setLoadingProgress] = useState(false); 
    const [uploadErr, setUploadErr] = useState(false)

    const storage = getStorage();

    const dispatch = useDispatch()

    useEffect(() => {
        if(user){
            setUserPicture(user.picture)
            setUserFirstName(user.firstName)
            setUserLastName(user.lastName)
        }
    },[])

    console.log(userLastName);

    if(!user){
        return (
            <Navbar />
        )
    }

    const updateUser = () => {
        updateUserInfo({
            id: user._id,
            userFirstName,
            userLastName,
            picture: userPicture
        })
        .then(res => {
            localStorage.setItem("user", JSON.stringify({...user,...res.data}));
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    }
    

    const upload = (item) => {
        const fileName = `${new Date().getTime()}_${item.label}_${
            item.file.name
        }`;
        let storageRef;
        
        (storageRef = ref(storage, `/user-picture/${fileName}`))

        const uploadTask = uploadBytesResumable(storageRef, item.file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setLoadingProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            
                    setUserPicture(url)
                    setLoadingPicture(false);
            
                });
            }
        );
    };

    const handleUpload = (file) => {
        // e.preventDefault();
        upload(file);
        setLoadingPicture(true);
        
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0]; 

      setPictureSelected(file)

      const reader = new FileReader(); 
        
    //   if (file.size > 1048576) {
    //     // 1 MB
    //     window.alert("Please upload a file smaller than 1 MB");
    //     return false;
    //   }
      
      reader.readAsDataURL(file);
  
      reader.onload = (event) => {
        const picture = event.target.result; 
        setPicture(picture);
      };
    };

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <h1>Thông tin cá nhân</h1>
                <p>Thay đổi ảnh đại diện và thông tin cá nhân của bạn. Thông tin chính xác sẽ giúp chúng tôi phục vụ bạn tốt hơn.</p>

                <div className = {styles.avatarSetting}>
                    <div className={styles.avatarContainer}>
                        <div className= {styles.avatar}>
                        {
                            picture
                            ?
                            <img src={picture} alt="" />
                            :
                            <Avatar user = {user}/>
                        }
                        </div>
                    </div>
                    <div className={styles.avatarActions}>
                        <label>
                            <input type="file" accept="image/*" onChange={handleFileChange}/>
                            Thay đổi
                        </label>
                    
                        <span onClick={() => handleUpload({ file: pictureSelected, label: "userPicture" })}>
                            Lưu
                        </span>
                    </div>
                    {
                        isUploadingPicture 
                        &&
                        <div className={styles.uploading}>
                            
                            <img src="/loading.gif" alt="" />
                            <span>
                                {loadingProgress} % 
                            </span>
                           
                        </div>
                    }
                </div>

                <div className={styles.info}>
                    <div className={styles.name}>
                        <h3>Thay đổi tên hiển thị</h3>
                        <div className={styles.changeName}>
                            <div className = {styles.nameInput}>
                                <span>
                                    Họ 
                                </span>
                                <input defaultValue={user.lastName} type="text" onChange = {(e) => setUserLastName(e.target.value)}/>
                            </div>
                            <div className = {styles.nameInput}>
                                <span>
                                    Tên
                                </span>
                                <input defaultValue={user.firstName} type="text" onChange = {(e) => setUserFirstName(e.target.value)}/>
                            </div>
                        </div>
                    </div>  
                </div>

                <div className={styles.confirm} onClick={updateUser}>
                    Xác nhận
                </div>
                
            </div>
        </div>
    );
}

export default Profile;
