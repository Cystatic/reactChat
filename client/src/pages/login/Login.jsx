import "./Login.css"

export default function Login() {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">R_Social</h3>
                    <span className="loginDesc">在此连接世界</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input placeholder="Email" className="loginInput" />
                        <input placeholder="Password" className="loginInput" />
                        <button className="loginButton">Log In</button>
                        <span className="loginForgot">忘记密码？</span> 
                        <button className="loginRegisterButton">注册</button>
                    </div>
                </div>
            </div>
        </div>
    
  )
}
