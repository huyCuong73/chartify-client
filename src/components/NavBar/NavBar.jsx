import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./navbar.module.scss";

import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useCallback, useEffect, useRef, useState } from "react";
import { logout } from "../../redux/actions/user";
import Avatar from "../Avatar/Avatar";
import { getNotif, updateNewNotif } from "../../api/notificationAPI";
import { HashLink } from "react-router-hash-link";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const Navbar = () => {
    const socket = useSelector((state) => state.socket);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const [mobileNav, setMobileNav] = useState(false)
    const [openNotification, setOpenNotification] = useState(false);
    const [openMobileNotification, setOpenMobileNotification] = useState(false);
    const [notification, setNotification] = useState(null);
    const [rereander, setRerender] = useState(false);
    const [notifCount, setNotifCount] = useState(null);
    const [loading, setLoading] = useState(false);

    const [msj, setMsj] = useState("");

    let practiceProgress;
    user
        ? (practiceProgress = user.progress.practice + 1)
        : (practiceProgress = 1);

    const [showDropBox, setShowDropBox] = useState(false);

    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    const notifRef = useRef(null);
	const notifIconRef = useRef(null)
    const mobileNotifRef = useRef(null)
	const mobileNotifIconRef = useRef(null)

    const navigate = useNavigate()

    useEffect(() => {
        function handleClickOutside(event) {
				if (notifRef.current && !notifRef.current.contains(event.target) && event.target !== notifIconRef.current) {
					setOpenNotification(false);
				}
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [notifRef]);

    useEffect(() => {
        function handleClickOutsideMobile(event) {
				if (mobileNotifRef.current && !mobileNotifRef.current.contains(event.target) && event.target !== mobileNotifIconRef.current) {
					setOpenMobileNotification(false);
				}
        }

        document.addEventListener("mousedown", handleClickOutsideMobile);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMobile);
        };
    }, [mobileNotifRef]);

    useEffect(() => {
        if (user) {
            setLoading(true);
            getNotif({ id: user._id }).then((res) => {
                setNotification(res.data.notif.reverse());
                setNotifCount(res.data.newNotifCount);
                setLoading(false);
            });
        }
    }, [user, socket, rereander]);

    useEffect(() => {
        socket?.on("replied", (res) => {
            console.log("replied");
            setLoading(true);
            getNotif({ id: user._id }).then((r) => {
                console.log("get", r.data);
                setNotification(r.data.notif.reverse());
                setNotifCount(r.data.newNotifCount);
                setLoading(false);
            });
        });
    }, [socket]);

    const updateNewNotification = (id) => {
        updateNewNotif({ uerId: user._id, id }).then(() =>
            setRerender(!rereander)
        );
    };

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
        } else if (difference < minute) {
            return Math.floor(difference / second) + " giây trước";
        } else if (difference < hour) {
            return Math.floor(difference / minute) + " phút trước";
        } else if (difference < day) {
            return Math.floor(difference / hour) + " giờ trước";
        } else if (difference < week) {
            return Math.floor(difference / day) + " ngày trước";
        } else if (difference < month) {
            return Math.floor(difference / week) + " tuần trước";
        } else if (difference < year) {
            return Math.floor(difference / month) + " tháng trước";
        } else {
            return Math.floor(difference / year) + " năm trước";
        }
    }

    const getDate = (dt) => {
        let year = +dt.getFullYear();
        let month = +dt.getMonth();
        let day = +dt.getDate();
        let hour = +dt.getHours();
        let minute = +dt.getMinutes();
        let second = +dt.getSeconds();

        return [year, month, day, hour, minute, second];
    };

    return (
        <div>
            
            <div className = {splitLocation[1] === "" ? styles.mobileHomeNavBar : styles.mobileNavBar}>
                { mobileNav 
                && 
                <div className={styles.mobileNav}>
                    {
                        user && 
                        <>
                            <div className={styles.navAvatar}>
                                <Avatar user = {user}/>
                            </div>
                            <div className = {styles.userName}>{user.lastName} {user.firstName}</div>
                        
                        </>
                    }

                    <div className={styles.nav}>
                        <Link
                            to="/"
                            className={
                                splitLocation[1] === ""
                                    ? styles.linkActive
                                    : styles.navItem
                            }
                        >   
                            <HomeIcon />
                            <div className={styles.navTitle}>Trang chủ</div>
                        </Link>
                        <Link
                            to={`/practice/exercise/${practiceProgress}`}
                            className={
                                splitLocation[1] === "practice"
                                    ? styles.linkActive
                                    : styles.navItem
                            }
                        >
                            <CreateIcon />
                            <div className={styles.navTitle}>Luyện tập</div>
                        </Link>
                        <Link
                            to="/course-list"
                            className={
                                splitLocation[1] === "course-list"
                                    ? styles.linkActive
                                    : styles.navItem
                            }
                        >
                            <ImportContactsIcon />
                            <div className={styles.navTitle}>Kiến thức</div>
                        </Link>
                        <Link
                            to="/posts"
                            className={
                                splitLocation[1] === "posts"
                                    ? styles.linkActive
                                    : styles.navItem
                            }
                        >
                            <NewspaperIcon />
                            <div className={styles.navTitle}>Bài viết</div>
                        </Link>
                        <Link
                            to="/about-us"
                            className={
                                splitLocation[1] === "about-us"
                                    ? styles.linkActive
                                    : styles.navItem
                            }
                        >
                            <NewspaperIcon />
                            <div className={styles.navTitle}>Giới thiệu</div>
                        </Link>
                    </div>
                </div>
                }

                <div className={styles.menu} onClick={() => setMobileNav(!mobileNav)}>
                    <MenuIcon className={splitLocation[1] === "" ? styles.homeMenuIcon : styles.menuIcon}/>
                </div>
                <Link to = "/">
                    <div className={styles.mobileLogo}>
                        <img src="/final1.png" alt="" />
                    </div>
                </Link>
                {
                    !user
                    ?
                    <button onClick = {() => navigate("/login")}>
                        Đăng nhập
                    </button>

                    :

                    <div className={styles.profile}>
                        <div
                            className={styles.notification}
                            
                        >
                            <div className={styles.iconWrapper}>
                                <NotificationsIcon className={styles.icon} />
                                {notification && notifCount !== 0 ? (
                                    <div className={styles.newNotifCount}>
                                        <div className={styles.notifCountWrapper}>
                                            <span>{notifCount}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className={styles.notifOverlay}
                                ref = {mobileNotifIconRef}
                                onClick={() => {
                                    setOpenMobileNotification(!openMobileNotification)
                                }}
                            >
                            </div>
                        </div>
                    
                        <div
                            className={styles.avatarContainer}
                            onClick={() => setShowDropBox(!showDropBox)}
                        >
                            <div className={styles.avatar}>
                                <Avatar user={user} />
                            </div>
                            <ArrowDropDownIcon />
                        </div>
                        {showDropBox && (
                            <div className={styles.dropbox}>
                                <Link to={`/profile/${user._id}`}>
                                    <div className={styles.item1} onClick = {() => setShowDropBox(false)}>
                                        <AccountBoxIcon />
                                        Profile
                                    </div>
                                </Link>
                                <div
                                    className={styles.item2}
                                    onClick={() => {
                                        dispatch(logout());
                                        socket.disconnect();
                                    }}
                                >
                                    <ExitToAppIcon />
                                    Log out
                                </div>
                            </div>
                        )}
                    </div>
                }

                {notification && openMobileNotification && (
                    <div className={styles.mobileNotificationBox} ref={mobileNotifRef}>
                        <div className={styles.title}>Thông báo</div>
                        <div className={styles.notificationContainer}>
                            {loading && (
                                <div className={styles.loadingWrapper}>
                                    <img
                                        src="/notifLoading.gif"
                                        alt=""
                                        className={styles.loading}
                                    />
                                </div>
                            )}
                            {notification.map((notif) => (
                                <HashLink
                                    smooth
                                    to={`${notif.dir}#${notif.sectionId}`}
                                >
                                    <div
                                        className={styles.notifWrapper}
                                        onClick={() => {
                                            updateNewNotification(notif._id);
                                            setOpenMobileNotification(false);
                                        }}
                                    >
                                        <div className={styles.notifAvatar}>
                                            <Avatar user={notif.fromUser} />
                                        </div>
                                        {notif.state === false ? (
                                            <div className={styles.notifBody}>
                                                <div
                                                    className={
                                                        styles.unreadNotifContent
                                                    }
                                                >
                                                    <span>
                                                        {notif.fromUser.lastName}{" "}
                                                        {notif.fromUser.firstName}{" "}
                                                    </span>
                                                    {notif.content}
                                                    <div
                                                        className={styles.dot}
                                                    ></div>
                                                </div>
                                                <div
                                                    className={
                                                        styles.unreadTimePassed
                                                    }
                                                >
                                                    {getTimePassed(
                                                        new Date(
                                                            ...getDate(
                                                                new Date(notif.date)
                                                            )
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={styles.notifBody}>
                                                <div
                                                    className={styles.notifContent}
                                                >
                                                    <span>
                                                        {notif.fromUser.lastName}{" "}
                                                        {notif.fromUser.firstName}{" "}
                                                    </span>
                                                    {notif.content}
                                                </div>
                                                <div className={styles.timePassed}>
                                                    {getTimePassed(
                                                        new Date(
                                                            ...getDate(
                                                                new Date(notif.date)
                                                            )
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </HashLink>
                            ))}
                        </div>
                    </div>
                )}
            </div>














            <div
                className={
                    splitLocation[1] === "" ? styles.homeNavBar : styles.navBar
                }
            >
                <div className={styles.logo}>
                    <img src="/final1.png" alt="" />
                </div>

                <div className={styles.nav}>
                    <Link
                        to="/"
                        className={
                            splitLocation[1] === ""
                                ? styles.linkActive
                                : styles.navItem
                        }
                    >
                        <span>Trang chủ</span>
                    </Link>
                    <Link
                        to={`/practice/exercise/${practiceProgress}`}
                        className={
                            splitLocation[1] === "practice"
                                ? styles.linkActive
                                : styles.navItem
                        }
                    >
                        <span>Luyện tập</span>
                    </Link>
                    <Link
                        to="/course-list"
                        className={
                            splitLocation[1] === "course-list"
                                ? styles.linkActive
                                : styles.navItem
                        }
                    >
                        <span>Kiến thức</span>
                    </Link>
                    <Link
                        to="/posts"
                        className={
                            splitLocation[1] === "posts"
                                ? styles.linkActive
                                : styles.navItem
                        }
                    >
                        <span>Bài viết</span>
                    </Link>
                    <Link
                        to="/about-us"
                        className={
                            splitLocation[1] === "about-us"
                                ? styles.linkActive
                                : styles.navItem
                        }
                    >
                        
                        <div className={styles.navTitle}>Tư vấn</div>
                    </Link>
                </div>

                {notification && openNotification && (
                    <div className={styles.notificationBox} ref={notifRef}>
                        <div className={styles.title}>Thông báo</div>
                        <div className={styles.notificationContainer}>
                            {loading && (
                                <div className={styles.loadingWrapper}>
                                    <img
                                        src="/notifLoading.gif"
                                        alt=""
                                        className={styles.loading}
                                    />
                                </div>
                            )}
                            {notification.map((notif) => (
                                <HashLink
                                    smooth
                                    to={`${notif.dir}#${notif.sectionId}`}
                                >
                                    <div
                                        className={styles.notifWrapper}
                                        onClick={() => {
                                            updateNewNotification(notif._id);
                                            setOpenNotification(false);
                                        }}
                                    >
                                        <div className={styles.notifAvatar}>
                                            <Avatar user={notif.fromUser} />
                                        </div>
                                        {notif.state === false ? (
                                            <div className={styles.notifBody}>
                                                <div
                                                    className={
                                                        styles.unreadNotifContent
                                                    }
                                                >
                                                    <span>
                                                        {notif.fromUser.lastName}{" "}
                                                        {notif.fromUser.firstName}{" "}
                                                    </span>
                                                    {notif.content}
                                                    <div
                                                        className={styles.dot}
                                                    ></div>
                                                </div>
                                                <div
                                                    className={
                                                        styles.unreadTimePassed
                                                    }
                                                >
                                                    {getTimePassed(
                                                        new Date(
                                                            ...getDate(
                                                                new Date(notif.date)
                                                            )
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={styles.notifBody}>
                                                <div
                                                    className={styles.notifContent}
                                                >
                                                    <span>
                                                        {notif.fromUser.lastName}{" "}
                                                        {notif.fromUser.firstName}{" "}
                                                    </span>
                                                    {notif.content}
                                                </div>
                                                <div className={styles.timePassed}>
                                                    {getTimePassed(
                                                        new Date(
                                                            ...getDate(
                                                                new Date(notif.date)
                                                            )
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </HashLink>
                            ))}
                        </div>
                    </div>
                )}

                {user ? (
                    <div className={styles.profile}>
                            <div
                                className={styles.notification}
                                
                            >
                                <div className={styles.iconWrapper}>
                                    <NotificationsIcon className={styles.icon} />
                                    {notification && notifCount !== 0 ? (
                                        <div className={styles.newNotifCount}>
                                            <div className={styles.notifCountWrapper}>
                                                <span>{notifCount}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className={styles.notifOverlay}
                                    ref = {notifIconRef}
                                    onClick={() => {
                                        setOpenNotification(!openNotification)
                                    }}
                                >
                                </div>
                            </div>
                        
                        <div
                            className={styles.avatarContainer}
                            onClick={() => setShowDropBox(!showDropBox)}
                        >
                            <div className={styles.avatar}>
                                <Avatar user={user} />
                            </div>
                            <ArrowDropDownIcon />
                        </div>
                        {showDropBox && (
                            <div className={styles.dropbox}>
                                <Link to={`/profile/${user._id}`}>
                                    <div className={styles.item1} onClick = {() => setShowDropBox(false)}>
                                        <AccountBoxIcon />
                                        Profile
                                    </div>
                                </Link>
                                <div
                                    className={styles.item2}
                                    onClick={() => {
                                        dispatch(logout());
                                        socket.disconnect();
                                    }}
                                >
                                    <ExitToAppIcon />
                                    Log out
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={styles.auth}>
                        <div className={styles.log}>
                            <Link to="/login" className={styles.a}>
                                Đăng nhập
                            </Link>
                        </div>
                        <div className={styles.log}>
                            <Link to="/register" className={styles.a}>
                                Đăng ký
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
