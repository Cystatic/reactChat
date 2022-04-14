import "./Group.css"

export default function Group({group}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="group">
            <img
                crossOrigin="anonymous"
                src={PF + "person/noCover.png"}
                alt=""
                className="groupImg" />
            <span className="groupName">{group.groupname}</span>
        </div>
    )
}
