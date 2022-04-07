import "./Topbar.css"
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { Link } from "react-router-dom"
import { logoutCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user,dispatch} = useContext(AuthContext)

  const handleClick = (e) => {
    e.preventDefault();
    logoutCall(dispatch);
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">R_Social</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="寻找朋友、帖子" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div >
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user._id}`}>
        <img src={user.profilePicture?PF + user.profilePicture:PF+"/person/noAvatar.png"} alt="" className="topbarImg" />
        </Link>
        <button className="logoutButton" onClick={handleClick}>退出登录</button>
      </div>
    </div>
  )
}
