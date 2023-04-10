import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./register.module.scss";
// import logo from "../../assets/img/tmdb.svg"
import * as actions from "../../redux/actions/user";
import { useDispatch } from "react-redux";
import { register, verify } from "../../api/authAPI";
import { createNotif } from "../../api/notificationAPI";
import { createUser } from "../../api/userAPI";

export default function Register() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [checkEmail, setCheckEmail] = useState(true);
    const [checkPhoneNumberFormat, setCheckPhoneNumberFormat] = useState(true);
    const [checkPhoneNumber, setCheckPhoneNumber] = useState(true);
    const [checkEmailExisted, setCheckEmailExisted] = useState(true);
    const [password, setPassword] = useState("");
	const [wrongOtp, setWrongOtp] = useState(false)
    const dispatch = useDispatch();
    // const [data, setData] = useState({});
	const [verifyCode, setVerifyCode] = useState("")
	const [newUser, setNewUser] = useState(null)
	const [loading, setLoading] = useState(false)

    function getFormattedPhoneNum(input) {
        let output = "";
        input.replace(
            /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/,
            function (match, g1, g2, g3) {
                if (g1.length) {
                    output += g1;
                    if (g1.length == 3) {
                        output += "";
                        if (g2.length) {
                            output += " " + g2;
                            if (g2.length == 3) {
                                output += " ";
                                if (g3.length) {
                                    output += g3;
                                }
                            }
                        }
                    }
                }
            }
        );
        return output;
    }

    const handleEmail = (email) => {
        let re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;

        if (re.test(email)) {
            setEmail(email);
            setCheckEmail(true);
        } else if (email === "") {
            setCheckEmail(true);
        } else {
            setCheckEmail(false);
        }
    };

    const handleRegister = async () => {
        try {
			setLoading(true)
            const res = await register({
                phoneNumber,
                email,
                password,
				firstName,
				lastName,
				defaultBackground: Math.floor(Math.random() * 7),
            });

            // setData(res.data);
            if (res.status === 201) {
				setLoading(false)
				setNewUser(res.data);

				// createUser({
				// 	phoneNumber,
				// 	email,
				// 	firstName,
				// 	lastName,
				// 	defaultBackground: Math.floor(Math.random() * 7),
				// })
				// 	.then((user) => {
				// 		dispatch(
				// 		    actions.loginRequest({
				// 		        phoneNumber,
				// 		        email,
				// 		        password,
				// 		    })
				// 		);
				// 		createNotif({
				// 			user: user.data._id,
				// 			notif: [],
				// 			newNotif: [],
				// 		})
				// 	})
				// 	.catch((err) => {
				// 		console.log(err);
				// 	})

            }
        } catch (err) {
            if (err.response.status === 403) {
                setCheckPhoneNumber(false);
				setLoading(false)
            }
			if (err.response.status === 405) {
                setCheckEmailExisted(false);
				setLoading(false)
            }
        }
    };

	const handleVerify = () => {
		setLoading(true)
		verify({
			email: newUser.newOtp.email,
			code: verifyCode,
			userCre: newUser.userCre
		})
			.then(() => {
					createUser({
					phoneNumber,
					email,
					firstName,
					lastName,
					defaultBackground: Math.floor(Math.random() * 7),
					})
						.then((user) => {
							dispatch(
								actions.loginRequest({
									phoneNumber,
									email,
									password,
								})
							);
							createNotif({
								user: user.data._id,
								notif: [],
								newNotif: [],
							})
						})
						.catch((err) => {
							console.log(err);
						})
			})
			.catch(err => {
				setLoading(false)
				setWrongOtp(true)
			})
	}

	console.log(newUser);

    return (
        <div className={style.register}>
			{
				!newUser
				?
				<div className={style.container}>
					<div className={style.logo}>
						<img src="/final1.png" alt="" />
					</div>
			
					<div className = {style.inputWrapper}>	
						<input
							type="text"
							placeholder="Số điện thoại"
							value={getFormattedPhoneNum(phoneNumber)}
							onChange={(e) => {
								setPhoneNumber(
									getFormattedPhoneNum(e.target.value)
								);
								setCheckPhoneNumber(true);
							}}
							/>
					</div>  
					{!checkPhoneNumber && (
						<span className={style.existedError}>
							Số điện thoại đã tồn tại
						</span>
					)}


					<div className = {style.inputWrapper}>
						<input
							type="email"
							placeholder="Email"
							onChange={(e) => {
								handleEmail(e.target.value);
								setCheckEmailExisted(true)
							}}
						/>
					</div>  
					{!checkEmail && (
						<span className={style.emailError}>
							Không đúng định dạng Email
						</span>
					)}
					{!checkEmailExisted && (
						<span className={style.existedError}>
							Email đã tồn tại
						</span>
					)}

					<div className={style.nameInputContainer}>

						<div className={style.nameInputWrapper}>
							
							<input
								placeholder="Họ"
								onChange={(e) => setLastName(e.target.value)}
							/>
							
						</div>

						<div className={style.nameInputWrapper}>
													
							<input
								placeholder="Tên"
								onChange={(e) => setFirstName(e.target.value)}
							/>
							
						</div>
					</div>


					<div className = {style.inputWrapper}>
						<input
							type="password"
							placeholder="Mật khẩu"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>  
					<div className = {style.inputWrapper}>
					<input
							type="password"
							placeholder="Nhập lại mật khẩu"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>  

					
					{!phoneNumber || !email || !password || !checkEmail ? (
					
							<button
								className={style.registerButtonDisabled}
								disabled
							>
								Đăng ký
							</button>
							
							) : (
							<>
								<button
								className={style.registerButton}
								onClick={() => {
									handleRegister();
									// setData(null);
								}}
								>
									Đăng ký
								</button>
								{(loading) && <img src = '/loading.gif' className={style.loading}></img>}
							</>
					)}

					
				</div>
				:
				<div className={style.verifyContainer}>
					<img src="/mailpt.svg" alt="" />
					<p>
						Chúng tôi đã gửi mã xác nhận đến địa chỉ email <span>{newUser.newOtp.email}</span>. Vui lòng nhập mã để kích hoạt tài khoản. Mã xác minh sẽ hết hạn trong 2 phút
					</p>
					<input 
						type = "text"
						placeholder="Nhập mã"
						onChange={e => {
							setVerifyCode(e.target.value)
							setWrongOtp(false)
						}}
					/>

					<div className={style.verifyButton}
						onClick = {() => {
							handleVerify()
							setLoading(true)
						}}
					>
						Xác minh
					</div>

					{
						wrongOtp && <span className={style.wrongOtp}>Nhập sai mã xác minh</span>
					}
					{(loading) && <img src = '/loading.gif' className={style.loading}></img>}
				</div>
			}
		
        </div>
    );
}
