import { useEffect, useRef, useState } from "react";
import {useSelector, useDispatch} from "react-redux"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import video from "../../assets/a2.mp4"
import img from "../../assets/img/a2.jpg"


import styles from "./exercise.module.scss";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Navbar from "../../components/NavBar/NavBar";
import { getExercise, submit } from "../../api/exerciseAPI";
import { useParams, useNavigate, Link   } from "react-router-dom";
import Widget from "../../components/Widget/Widget";
import { updatePracticeProcess } from "../../api/userAPI";
import * as updateUserActions  from "../../redux/actions/user"
import DOMPurify from "dompurify";
import CommentSection from "../../components/CommentSection/CommentSection";

const Exercise = () => {

    const user =  useSelector( state => state.user.user)
    const exercises =  useSelector( state => state.exercises.exercises)
    const socket =  useSelector( state => state.socket)
	const dispatch = useDispatch()
	const param = useParams()
	const navigate = useNavigate();
	const [exercise, setExercise] = useState(null)
	const [exceedLimit, setExceedLimit] = useState(false)

	const [showed, setShowed] = useState(false);
	const [runInitVideo, setRunInitVideo] = useState(true);
	const [correctAnswer, setCorrectAnswer] =  useState(false)
	const [startChecking, setStartChecking] = useState(false)
	const [pickedAnswer, setPickedAnswer] = useState(0);
	const [showOverviewImage, setShowOverViewImage] = useState(false)
	const [imgLoaded, setImgLoaded] = useState()

	const wrapperRef = useRef(null);


	useEffect(() => {
		setExceedLimit(false)
		if(exercises.length > 0){
			setExercise(exercises[param.order-1])

			if(param.order > exercises.length){
				setExceedLimit(true)
			}
		}


	},[user,param.order,exercises])

	useEffect(() => {
		setImgLoaded(false)
	},[param.order])

	useEffect(() => {
		if(exercise){
			if(exercise.initVideo === ""){
				setRunInitVideo(false)
			}else{
				setRunInitVideo(true)
			}
			setPickedAnswer(0)
			setStartChecking(false)
			setShowed(false)
			if(user){
				if(exercise.order > user.progress.practice){
					dispatch(updateUserActions.updatePracticeProgressRequest({
						userId : user._id,
						updateData: exercise.order
					}))
	
		
				}
			}
		}
	},[exercise,user])

	useEffect(() => {

		function handleClickOutside(event) {
		  if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
			setShowOverViewImage(false)
		  }
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
		  document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [wrapperRef]);

	useEffect(() => {
		setRunInitVideo(true)
	},[])
	
	if(exceedLimit){
		return (
			<div>
				<Navbar />
				<Link to = "/practice">
					
					<div className={styles.limitPageContainer}>
						<div>
							Bạn đã làm hết toàn bộ câu hỏi
						</div>
						<span>
							Xem lại toàn bộ câu hỏi
						</span>
					</div>
				</Link>
			</div>
	)}
	if(!exercise){
		return (
			<Navbar />
		)
	}


	const answerList = exercise.answerList
	const answer = exercise.correctAnswer

	const showAnswerStat = () => { 
		let check = 0
		for(let i = 0; i < exercise.firstAttempt.length; i++){
			if(exercise.firstAttempt[i].checkAnswer === true){
				check += 1
			}
		}
		if( exercise.firstAttempt.length === 0) return 0
		return Math.round(check/exercise.firstAttempt.length*100)
	}

	const checkFirstSubmit = () => exercise.firstAttempt.some( e => {
		if (e.userId === user._id) {
			return true;
		  }
		  return false;
	})
	

	const submitAnswer = (check) => {
		submit({
			exerciseId: exercise._id,
			userId: user._id,
			checkAnswer: check
		})

	}



	const checkAnswer = () => {
		if(pickedAnswer === answer){
			setCorrectAnswer(true)
			setStartChecking(true)
		}
		else{
			setCorrectAnswer(false)
			setStartChecking(true)
		}
	}

	const nextPage = () => {
		setExercise(null)
		navigate(`/practice/exercise/${(parseInt(param.order) + 1).toString()}`)
		socket.emit("dm", "dmmmmmmmmmmmmmmmm")
	}
	const previousPage = () => {
		setExercise(null)
		navigate(`/practice/exercise/${(parseInt(param.order) - 1).toString()}`)
	}

 	return (
    <div className={styles.container}>
        <Navbar/>

		{
			showOverviewImage 
			&&
			<div className={styles.blurBackground}>
				<div className= {styles.overviewWrapper}>
					<img className={styles.overviewImage} src = {exercise.overviewImg} ref={wrapperRef}></img>
				</div>
			</div>
		}

		<div className={styles.main}>

			<div className={styles.exerciseContainer}>

				<div className={styles.exercise}>
				
					<div className={styles.questionContainer}>
						<div className={styles.question}>
							<span className={styles.text}>{exercise.question}</span>
							<span className={styles.stat}>{showAnswerStat()}% người đã trả lời đúng câu hỏi này</span>
						</div>
						<div className={styles.display}>
							{
								!imgLoaded
								&&
								<div className={styles.holder}>

								</div>
							}
							{ 
								(exercise.initImg !== "" && runInitVideo)
								&&
								<img className = {styles.initImg} src={exercise.initImg} alt="" />
							}
							{
								runInitVideo && exercise.initVideo !== "" 
								&&
								<div className={styles.initChart}>
									<video src = {exercise.initVideo} autoPlay muted playsinline onEnded={() => {
										setRunInitVideo(false)
									}}></video>
								</div>
								
							}
		
							<img className = {styles.mainImg} src={exercise.imageURL[0]} alt="" onLoad={() => {
								setImgLoaded(true)
							}}/>																																		
							
							{
								!showed || <video src={exercise.videoURL[0]} autoPlay muted playsinline  onEnded={() => checkAnswer() }></video>
							}
							{
								(startChecking && !correctAnswer) ? 
							
									<CloseIcon className= {styles.checkIconFalse}></CloseIcon>
							
								: <div></div>
							}
							{
								(startChecking && correctAnswer) ? 
							
									<DoneIcon className= {styles.checkIconTrue}></DoneIcon>
							
								: <div></div>
							}						

						</div>
						
					</div>


					<div className={styles.showContainer}>
						{
							runInitVideo 
							?
							answerList.map((answer, i) => (
								<div className={styles.answerDisabled} >
									<span>{answer}</span>
								</div>
							))
							:
								pickedAnswer === 0 
								?
								answerList.map((answer, i) => (
									<div className={styles.answer} 
									onClick={() => {
										setShowed(true)
										setPickedAnswer(i+1);

										if(user._id){
											if(!checkFirstSubmit()){
												
												if(i+1 === exercise.correctAnswer){
													submitAnswer(true)
												}else{
													submitAnswer(false)
												}
											}
										}
									}}>
										<span>{answer}</span>
									</div>
								))
								:						
								answerList.map((answer, i) => (
									<div className={(pickedAnswer === i + 1)? styles.answerPicked : styles.answerDisabled} >
										<span>{answer}</span>
									</div>
								))
							
						}
					</div>

				</div>

				<div className={styles.controller}>
					{
						pickedAnswer !== 0  ?
						<>
							<button className={styles.reset} 
								onClick={() => {
									setShowed(false)
									setStartChecking(false)
									setPickedAnswer(0)
									if(exercise.initVideo !== ""){
										setRunInitVideo(true)
									}
								}
								}>
								Hiển thị lại câu hỏi
							</button>
							<button className={styles.next} onClick = {nextPage}>
								Chuyển đến câu tiếp theo
							</button>
						</>
						: 
						<>
							{
								param.order > 1
								?
								<button className={styles.next} onClick = {previousPage} >
									Quay lại câu hỏi trước
								</button>
								:
								<button  className={styles.disabled} >
									Quay lại câu hỏi trước
								</button>				
							}
							{
								!runInitVideo
								&&
								<button className={styles.next} onClick={() => setShowOverViewImage(true)}>
									Xem biểu đồ tổng quát
								</button>
							}
						</>
					}
				</div>
				
				<Link to = '/practice' >    
					<span className = {styles.showAllEx}>
						Hiển thị toàn bộ câu hỏi		
					</span>
				</Link>

				{
					pickedAnswer !== 0 && startChecking?
					<div className={styles.explaination}>
						<span>Giải thích</span>
						<div className={styles.tiny} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(exercise.explaination)}}/>
					</div>
					: <></>
				}

				<div>
					<CommentSection pageId = {exercise._id}/>
				</div>

			</div>
			<div className={styles.widgetContainer}>
				<div className={styles.widget}>
					<Widget />
				</div>
			</div>
		
		</div>

    </div>

  );
};

export default Exercise;
