import { Link } from "react-router-dom";
import "./OnlineFriend.css"

export default function OnlineFriend({ friend }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="rightbarFriend">
            <Link
                to={"/profile/" + friend._id}
                style={{ textDecoration: "none" }}
            >
                <div className="rightbarProfileImgContainer">

                    <img crossOrigin="anonymous"
                        src={friend.profilePicture
                            ? PF + friend.profilePicture :
                            PF + "person/noAvatar.png"}
                        alt=""
                        className="rightbarFriendImg" />
                    <span className="rightbarOnline"></span>
                </div>
            </Link>
            <span className="rightbarfriendname">{friend.friendname}</span>
        </li>
    )
}
