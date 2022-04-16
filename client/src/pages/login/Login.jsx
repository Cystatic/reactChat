import "./Login.css"
import { useContext, useRef, useState } from "react"
// import { loginCall } from "../../apiCalls";
// import { AuthContext } from "../../context/AuthContext";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginCall } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const [alert, setAlert] = useState(0)
    const dispatch = useDispatch();
    const pending = useSelector((state) => state.user.pending);
    const error = useSelector((state) => state.user.error);


    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)
        console.log(error)
        if (error) {
            setAlert(1)
        } 
    }
    const navigate = useNavigate();
    const toRegister = () => {
        navigate("/register");
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">R_Social</h3>
                    <span className="loginDesc">在此连接世界</span>
                </div>
                <form className="loginRight" onSubmit={handleClick}>
                    <div className="registerAlert">
                        {alert === 1 ?
                            <Alert severity="error" onClose={() => { setAlert(0) }}>
                                <AlertTitle>Failre</AlertTitle>
                                This is a failure alert — <strong>登录失败</strong>
                            </Alert> : <></>
                        }
                    </div>
                    <div className="loginBox">
                        <input placeholder="Email" type="email" className="loginInput" ref={email} required />
                        <input placeholder="Password" type="password" className="loginInput" ref={password} required minLength={6} />
                        <button className="loginButton" disabled={pending}>
                            {pending ? (
                                <CircularProgress color="secondary" size="20px" />
                            ) : (
                                "Log In"
                            )}
                        </button>
                        <span className="loginForgot">忘记密码？</span>
                        <button className="loginRegisterButton" onClick={toRegister} disabled={pending}>
                            创建新账户
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}
