import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import "./Message.css"

export default function Message({own,message}) {
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const[sender,setSender] = useState(null);

  useEffect(()=>{
    const getSender = async() => {
      try{
        const res = await axios.get("/users/"+message.sender);
        setSender(res.data)
      }catch(err){
        console.log((err))
      }
    }
    if(message){
      getSender()
    }
  },[message])

  return (
    <div className={own? "message own":"message"}>
      {own?
      <div className="messageTop">
        <p className="messageText">{message.text}</p> 
        <Link to={`/profile/${sender?._id}`}>
          <img
              className="messageImg"
              crossOrigin="anonymous"
              src={
                  sender?.profilePicture?
                  PF + sender.profilePicture
                  :PF + "person/noAvatar.png"}
              alt=""
            />
        </Link>
      </div>
      :
      <div className="messageTop">
        <Link to={`/profile/${sender?._id}`}>
          <img
              className="messageImg"
              crossOrigin="anonymous"
              src={
                  sender?.profilePicture?
                  PF + sender.profilePicture
                  :PF + "person/noAvatar.png"}
              alt=""
            />
        </Link>
        <p className="messageText">{message.text}</p>
      </div>
      }
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
