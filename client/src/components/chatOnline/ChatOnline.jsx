import "./ChatOnline.css"

export default function ChatOnline() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="chatOnline">
        <div className="chatOnlineFriend" >
          <div className="chatOnlineImgContainer">
            <img
              crossOrigin="anonymous"
              className="chatOnlineImg"
              src={
                PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">John</span>
        </div>
    </div>
  );
}
