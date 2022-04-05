import "./Login.css"
import { useContext, useRef } from "react"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext)
    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)
    }
    console.log(user);
    const navigate = useNavigate();
    const toRegister = ()=>{
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
                    <div className="loginBox">
                        <input placeholder="Email" type="email" className="loginInput" ref={email} required />
                        <input placeholder="Password" type="password" className="loginInput" ref={password} required minLength={6} />
                        <button className="loginButton" disabled={isFetching}>
                            {isFetching ? (
                                <CircularProgress color="secondary" size="20px" />
                            ) : (
                                "Log In"
                            )}
                        </button>
                        <span className="loginForgot">忘记密码？</span>
                        <button className="loginRegisterButton" onClick={toRegister} disabled={isFetching}>
                            
                            创建新账户
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}
