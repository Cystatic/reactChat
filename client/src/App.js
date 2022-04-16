import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import GroupChat from "./pages/groupChat/GroupChat";
import { useSelector } from "react-redux";
import store from "./redux/store";

function App() {
  // const {user} = useContext(AuthContext)
  const user = useSelector((state) => state.user.userInfo);

  const saveState = (state) => {
    localStorage.setItem("user", JSON.stringify(state.user.userInfo))
  };
  
  window.onbeforeunload = (e) => {
    saveState(store.getState())
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user?<Home />:<Login/>}></Route>
        <Route path="/login" element={user?<Navigate to = "/"/>:<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/profile/:userId" element={user?<Profile />:<Login/>}></Route>
        <Route path="/messenger" element={user?<Messenger />:<Login/>}></Route>
        <Route path="/groupChat" element={user?<GroupChat />:<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
