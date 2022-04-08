import "./Conversation.css"

export default function Conversation() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="conversation">
      <img
        crossOrigin="anonymous"
        className="conversationImg"
        src={
          PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">John</span>
    </div>
  );
}
