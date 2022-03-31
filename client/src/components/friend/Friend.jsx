import "./Friend.css"

export default function Friend({user}) {
    return (
        <li className="leftbarFriend">
            <img src={user.profilePicture} alt="" className="leftbarFriendImg" />
            <span className="leftbarFriendName">{user.username}</span>
        </li>
    )
}
