import { Alert, AlertTitle } from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"

export default function Login() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const [alert, setAlert] = useState(0);
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (password.current.value !== passwordAgain.current.value) {
            passwordAgain.current.setCustomValidity("两次密码不一致")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            };
            try {
                await axios.post("auth/register", user);
                setAlert(1);
            } catch (err) {
                console.log(err);
                setAlert(2)
            }
        }
    }
    const toLogin = (e) => {
        e.preventDefault();
        navigate("/login");

    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">R_Social</h3>
                    <span className="loginDesc">在此连接世界</span>
                </div>
                <div className="loginRight" >
                    <div className="registerAlert">
                        {alert === 1 ?
                            <Alert severity="success" onClose={() => { setAlert(0) }}>
                                <AlertTitle>Success</AlertTitle>
                                This is a success alert — <strong>注册成功!</strong>
                            </Alert> : alert === 2 ? <Alert severity="error" onClose={() => { setAlert(0) }}>
                                <AlertTitle>Failre</AlertTitle>
                                This is a failure alert — <strong>注册失败!该用户已存在</strong>
                            </Alert> : <></>
                        }
                    </div>
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="Username"
                            className="loginInput"
                            required
                            ref={username} />
                        <input
                            placeholder="Email"
                            className="loginInput"
                            type="email"
                            required
                            ref={email} />
                        <input
                            placeholder="Password"
                            className="loginInput"
                            type="password"
                            required
                            ref={password} />
                        <input
                            placeholder="Password Again"
                            className="loginInput"
                            type="password"
                            required
                            ref={passwordAgain} />

                        <button className="loginButton" type="submit">注册</button>
                        <button className="loginRegisterButton" onClick={toLogin}>登录</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
