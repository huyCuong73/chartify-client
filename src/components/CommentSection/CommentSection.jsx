import React, { useCallback, useEffect, useState } from 'react';
import {useSelector} from "react-redux"
import sanitizeHtml from "sanitize-html"
import ContentEditable from 'react-contenteditable';

import styles from "./commentSection.module.scss"
import "./commentSection.css"
import { getComments, submitComment } from '../../api/commentAPI';
import DOMPurify from 'dompurify';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Avatar from '../Avatar/Avatar';
import { updateNotification } from '../../api/notificationAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

const CommentSection = ({pageId}) => {
    const user =  useSelector( state => state.user.user)
    const socket = useSelector(state => state.socket)
    const navigate = useNavigate()

    const [content, setContent] = useState("")
    const [reply, setReply] = useState("")
    const [comments, setComments] = useState([])
    const [openReplyingEditor, setOpenReplyingEditor] = useState(-1)
    const [submittedComment, setSubmittedComment] = useState(false)
    
    const [displayReply, setDisplayReply] = useState([])
    const [replyList, setReplyList] = useState({})

    const [replyReply, setReplyReply] = useState("")
    const [openReplyReplyingEditor, setOpenReplyReplyingEditor] = useState({index:-1, parentId:""})
    const [displayReplyReply, setDisplayReplyReply] = useState([])
    const [ReplyReplyList, setReplyReplyList] = useState({})
    
    const [parentComment, setParentComment] = useState({})

    const location = useLocation();
    
    useEffect(() => {
        if(pageId)
            getComments(pageId)
                .then(res => {
                    setComments(res.data)
                    setSubmittedComment(false)
                })
                .catch(err => {

                }) 
    },[pageId, submittedComment, location.hash])

    useEffect(() => {
        let parent = []
        for(let i = comments.length - 1; i >= 0; i--){
            for(let j = i ; j >= 0 ; j--){
                if(comments[i]._id === comments[j].parentCommentId){
                    if(!parent.hasOwnProperty(i)){
                        parent[i] = []
                    }
                    if(!parent[i].includes[j]){
                        parent[i].push(comments[j])
                    }
                }
            }
        }

        setParentComment(parent)
        if(location.hash && parent.length !== 0 ){
            let key
            for (var prop in parent) {
                if (parent.hasOwnProperty(prop)) {
                    for (let i of parent[prop]){
                        if(i._id === location.hash.slice(1)){
                            key = Number(prop)
                            break
                        }
                    
                    }
                }
              }
            if(!displayReply.includes(key)){
                setDisplayReply(pre => [...pre,key])
            }
        }
        
        
    },[comments])


    const sanitizeConf = {
        allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
        allowedAttributes: { a: ["href"] }
    };

    const handleChange = evt => {
        setContent(evt.target.value)
    };

    const handleReply = evt => {
        setReply(evt.target.value)
    }; 

    const handleReplyReply = (value) => {
        setReplyReply(value)
    };  

    const sanitize = () => {
        sanitizeHtml(content,sanitizeConf)
    }


    const submit = () => {
        submitComment({
            pageId,
            date: new Date(),
            userId: user._id,
            detail: content
        })
        .then((res) => {
            setDisplayReply(prev => prev.map((element) => element + 1))
            setSubmittedComment(true)
            setContent("")
        })
    }

    const submitReply = (parentCommentId, userId) => {

        submitComment({
            pageId,
            date: new Date(),
            parentCommentId,
            userId: user._id,
            detail: reply
        })
        .then((res) => {
            setSubmittedComment(true)
            setReply("")
            setDisplayReply(prev => prev.map((element) => element + 1))
            setOpenReplyingEditor(-1)

            if(userId !== user._id){

                updateNotification({
                    userId,
                    content:{
                        fromUser: user._id,
                        date: new Date(),
                        dir:location.pathname,
                        sectionId: res.data._id,
                        content: "đã trả lời bình luận của bạn"
                    }
                })
                .then(() => socket.emit("replyComment",userId))
            }
        })
    }

    const submitReplyReply = (parentCommentId, i , firstName, lastName, userId) => {
        
        if(userId === user._id){
            submitComment({
                pageId,
                date: new Date(),
                parentCommentId,
                userId: user._id,
                detail: replyReply.trim()
            })      
            .then(async(res) => {
                setDisplayReply(prev => prev.map((element) => element + 1))
                setSubmittedComment(true)                                                                      
                setReplyReply("")
                setOpenReplyReplyingEditor(-1)
                    
            })      
        }else{
            submitComment({
                pageId,
                date: new Date(),
                parentCommentId,
                userId: user._id,
                detail: `<span class = "userReplied">${lastName} ${firstName}</span> ${replyReply.trim()}`
            })
            .then(async(res) => {
                setDisplayReply(prev => prev.map((element) => element + 1))
                setSubmittedComment(true)                                                                      
                setReplyReply("")
                setOpenReplyReplyingEditor(-1)
                updateNotification({
                    userId,
                    content:{
                        fromUser: user._id,
                        date: new Date(),
                        dir:location.pathname,
                        sectionId: res.data._id,
                        content: "đã trả lời bình luận của bạn"
                    }
                })
                .then(() => socket.emit("replyComment",userId))
                    
            }) 
        }

    }

	function getTimePassed(postDate) {

		let currentDate = new Date();

		let difference = currentDate - postDate;
		let second = 1000;
		let minute = second * 60;
		let hour = minute * 60;
		let day = hour * 24;
		let week = day * 7;
		let month = day * 30;
		let year = day * 365;
		
		 if (difference < second) {
		   return "Ngay bây giờ";
		 }
		 else if (difference < minute) {
		   return Math.floor(difference / second) + " giây ";
		 }
		 else if (difference < hour) {
		   return Math.floor(difference / minute) + " phút ";
		 }
		 else if (difference < day) {
		   return Math.floor(difference / hour) + " giờ ";
		 }
		 else if (difference < week) {
		   return Math.floor(difference / day) + " ngày ";
		 }
		 else if (difference < month) {
		   return Math.floor(difference / week) + " tuần ";
		 }
		  else if (difference < year) {
			return Math.floor(difference / month) + " tháng ";
		  }
		  else {
			return Math.floor(difference / year) + " năm ";
		}
	}

    const getDate = (dt) => {
		
		let year = +dt.getFullYear ();
		let month = +dt.getMonth ();
		let day = +dt.getDate ();
		let hour = +dt.getHours ();
		let minute = +dt.getMinutes ();
		let second = +dt.getSeconds ();

		return [year, month, day, hour, minute, second];
	}

    return (
        <div className={styles.container}>
            <h2>Bình luận</h2>
            {
                user
                ?
                <div className={styles.writeComment}>
                    <div className={styles.commentEditor}>
                        <div className={styles.avatarWrapper}>
                            <Avatar user = {user}/>
                        </div>
                        <ContentEditable
                            className={styles.text}
                            tagName="div"
                            html={content}

                            onChange={handleChange} 
                            onBlur={sanitize}
                        />
                    </div>
                    <div className={styles.action}>
                        <div className= {styles.cancel} >
                            <span>
                                Hủy
                            </span>
                        </div>
                        <div className= {styles.submit} onClick = {submit}>
                            <span>
                                Đăng
                            </span>
                        </div>
                    </div>
                </div>
                :
                <div className={styles.suggestion}>
                    <ChatBubbleOutlineOutlinedIcon />
                    <span>Hãy đăng nhập để bình luận</span>
                </div>
            }

            <div className= {styles.comments}>
                {
                    comments.map((comment , i) => (

                        <div style={{margin: "20px 0"}}>
                            {
                                !comment.parentCommentId
                                &&
                                <div className = {styles.commentContainer}>
                                    <div className={styles.avatar}>
                                        <Avatar user = {comment.userId} />
                                    </div>
                                    <div className={styles.commentBody}>
                                        <div className= {styles.commentDetail} >
                                            <div className={styles.user}>
                                                <span>
                                                {`${comment.userId.lastName} ${comment.userId.firstName}`}
                                                </span>
                                            </div>
                                            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(comment.detail)}}></div>
                                        </div>
                                        <div className={styles.reply}>
                                            {
                                                user 
                                                ?
                                                <span onClick={() => {
                                            
                                                    setOpenReplyingEditor(i)
                                                    setReply("")
                                                }}>Phản hồi</span>
                                                :
                                                <span onClick={() => {
                                                    navigate("/login")
                                                }}>Phản hồi</span>
                                            }
                                            <span>
                                                {getTimePassed(new Date(...getDate(new Date(comment.date))))}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            }
                            
                            {
                                i === openReplyingEditor 
                                &&
                                <div className={styles.writeReplyComment}>
                                    <div className={styles.replyCommentEditor}>
                                        <div className={styles.avatarWrapper}>
                                            <Avatar user = {user}/>
                                        </div>
                                        <ContentEditable
                                            className={styles.text}
                                            tagName="div"
                                            html={reply}
                                            onChange={handleReply} 
                                        />       
                                    </div>

                                    <div className={styles.action}>
                                        <div className= {styles.cancel} onClick = {() => {
                                            setOpenReplyingEditor(-1)
                                            setReply("")
                                        }} >
                                            <span>
                                                Hủy
                                            </span>
                                        </div>
                                        <div className= {styles.submit} onClick = {() => {
                                            submitReply(comment._id, comment.userId._id)
                                        }}>
                                            <span>
                                                Đăng
                                            </span>
                                        </div>
                                    </div>

                                </div>  
                            }
                            {
                                parentComment.hasOwnProperty(i)
                                &&
                                <div>
                                    {
                                        !displayReply.includes(i) 
                                        ?
                                        <div className={styles.showReply} onClick={() => {
                                            setDisplayReply(pre => [...pre, i ])
                                        }}>
                                            <span>
                                                Hiện {parentComment[i].length} phản hồi 
                                            </span>
                                            <ArrowDropDownIcon />
                                        </div>
                                        :
                                        <div className={styles.showReply} onClick={() => {
                                            setDisplayReply(pre => 
                                                [...pre].filter((item => item !== i))
                                                )
                                        }}>
                                            <span>
                                                Đóng phản hồi
                                            </span>
                                            <ArrowDropUpIcon />
                                        </div>
                                    }
                                </div>
                            }

                            {
                                displayReply.includes(i) 
                                &&
                                <div className={styles.replies}>
                                    {
                                        parentComment[i]
                                        &&
                                        parentComment[i].map((rep,index) => (
                                            <div  className={styles.replyContainer}>
                                                <div className= {styles.replyAvatar}>
                                                    <Avatar user = {rep.userId}/>
                                                </div>
                                                <div className={styles.replyBody}>
                                                    <div className={styles.replyDetail}>
                                                        <span className={styles.replyUser}>{`${rep.userId.lastName} ${rep.userId.firstName}`}</span>
                                                        <div id = {rep._id} className={styles.repDetail} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(rep.detail)}}></div>
                                                    </div>
                                                    {
                                                        user
                                                        ?
                                                        <div className={styles.replyAction}>
                                                            <span className={styles.replyButton} onClick={() => setOpenReplyReplyingEditor({index, parentId: comment._id})}>Phản hồi</span>
                                                            <span className={styles.replyTimePassed}>{getTimePassed(new Date(...getDate(new Date(rep.date))))}</span>
                                                        </div>
                                                        :
                                                        <div className={styles.replyAction}>
                                                            <span className={styles.replyButton} onClick={() => navigate("/login")}>Phản hồi</span>
                                                            <span className={styles.replyTimePassed}>{getTimePassed(new Date(...getDate(new Date(rep.date))))}</span>
                                                        </div >
                                                    }
                                                    
                                                    
                                                    {
                                                        (index === openReplyReplyingEditor.index && rep.parentCommentId === openReplyReplyingEditor.parentId)
                                                        &&
                                                        <div className={styles.writeReplyReply}>
                                                            <div className={styles.replyReplyEditor}>
                                                                <div className={styles.avatarWrapper}>
                                                                    <Avatar user = {user}/>
                                                                </div>

                                                                <ContentEditable
                                                                    className={styles.text}
                                                                    tagName="div"
                                                                    html={replyReply}
                                                                    onChange={(e) => handleReplyReply(e.target.value)} 
                                                                />
                                                            </div>

                                                            <div className={styles.action}>
                                                                <div className= {styles.cancel} onClick = {() => {
                                                                    setOpenReplyReplyingEditor(-1)
                                                                    setReplyReply("")
                                                                }} >
                                                                    <span>
                                                                        Hủy
                                                                    </span>
                                                                </div>
                                                                <div className= {styles.submit} onClick = {() => {
                                                                    submitReplyReply(comment._id,i, rep.userId.firstName, rep.userId.lastName, rep.userId._id)
                                                                }}>
                                                                    <span>
                                                                        Đăng
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* <button onClick = {() => {
                                                                setOpenReplyReplyingEditor(-1)
                                                                setReplyReply("")
                                                            }}>Hủy</button>
                                                            <div className= {styles.submit} onClick = {() => {
                                                                    submitReplyReply(comment._id,i, rep.userId.firstName, rep.userId.lastName, rep.userId._id)
                                                            
                                                                }}>
                                                                <span>
                                                                    Gửi
                                                                </span>
                                                            </div> */}
                                                        </div>  
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div> 
                            }
                        </div>

                    ))
                }
            </div>
        </div>
    );                                         
}

export default CommentSection;
