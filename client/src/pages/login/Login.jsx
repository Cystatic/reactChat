import "./Login.css"
import { useRef } from "react"
export default function Login() {
    const email = useRef();
    const password = useRef();

    const handleClick = (e)=>{
        e.preventDefault();
        console.log(email.current.value)
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
                        <input placeholder="Email" type="email" className="loginInput" ref={email} required/>
                        <input placeholder="Password" type="password" className="loginInput" ref={password} required minLength={6}/>
                        <button className="loginButton">Log In</button>
                        <span className="loginForgot">忘记密码？</span>
                        <button className="loginRegisterButton">注册</button>
                    </div>
                </form>
            </div>
        </div>

    )
}
