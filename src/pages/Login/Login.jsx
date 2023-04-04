import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../redux/actions/user";
import logo from "../../assets/img/tmdb.svg";

import style from "./login.module.scss";

export default function Login() {
    const user = useSelector((state) => state.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toggleLoading, setToggleLoading] = useState(false);

    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        setToggleLoading(true);
        dispatch(
            actions.loginRequest({
                email,
                password,
            })
        );
    };
    useEffect(() => {
        if (user.error) {
            setToggleLoading(false);
        }
    }, [user.error]);

    return (
        <div className={style.login}>

            <div className={style.container}>
                
				<span className={style.logo}>LOGO</span>
				<div className={style.inputWrapper}>
					<input
						type="email"
						placeholder="Số điện thoại hoặc email"
						onChange={(e) => {
							setEmail(e.target.value);
							user.error = false;
						}}
					/>
				</div>
				<div className={style.inputWrapper}>
					<input
						type="password"
						placeholder="Mật khẩu"
						onChange={(e) => {
							setPassword(e.target.value);
							user.error = false;
						}}
					/>
				</div>
				{!email || !password ? (
					<div
						className={style.loginButtonDisabled}
						onClick={(e) => e.preventDefault()}
					>
						<b>Đăng nhập</b>
					</div>
				) : (
					<button
						className={style.loginButton}
						onClick={handleLogin}
					>
						<b>Đăng nhập</b>
					</button>
				)}

				
					<div className={style.signupButton}>
						<span>Bạn chưa có tài khoản? <Link to="/register" className={clsx("link")}><b> Đăng ký</b></Link></span>
					</div>
				
				{
				toggleLoading
				 && 
				(
					<span className={style.loginText}>Đang đăng nhập...</span>
				)}
				{user.error && !toggleLoading && (
					<span className={style.error}>
						{user.error}
					</span>
				)}
            </div>
        </div>
    );
}
