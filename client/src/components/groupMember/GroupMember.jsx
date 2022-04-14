import { Link } from "react-router-dom";
import "./GroupMember.css"

export default function GroupMember({member}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="groupMember">
            <Link to={`/profile/${member._id}`}>
            <img
                crossOrigin="anonymous"
                src={
                    member.profilePicture?
                    PF + member.profilePicture
                    :PF + "person/noAvatar.png"}
                alt=""
                className="groupMemberImg" />
            </Link>
            <span className="groupMemberName">{member.username}</span>
        </div>
    )
}
