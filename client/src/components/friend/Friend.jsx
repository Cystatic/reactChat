import { Link } from "react-router-dom";
import "./Friend.css"

export default function Friend({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        
        <li className="leftbarFriend">
            <Link to={`/profile/${user._id}`}>
                <img crossOrigin="anonymous" src={user?.profilePicture?PF + user.profilePicture:PF+"person/noAvatar.png"} alt="" className="leftbarFriendImg" />
            </Link>
            <span className="leftbarFriendName">{user?.username}</span>
        </li>
        
    )
}
