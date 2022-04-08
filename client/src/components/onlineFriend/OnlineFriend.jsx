import "./OnlineFriend.css"

export default function OnlineFriend({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
            <img crossOrigin="anonymous" src={user.profilePicture?PF + user.profilePicture:PF+"person/noAvatar.png"} alt="" className="rightbarFriendImg" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    )
}
