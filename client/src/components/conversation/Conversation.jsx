import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css"

export default function Conversation({conversation,curUser}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== curUser._id);

    const getFriend = async()=>{
      try{
        const res = await axios.get("/users/"+friendId);
        setUser(res.data)
      }catch(err){
        console.log(err)
      }
    };
    getFriend();
  },[conversation,curUser])
 


  return (
    <div className="conversation">
      <img
        crossOrigin="anonymous"
        className="conversationImg"
        src={
          user?.profilePicture
          ? PF + user.profilePicture
          : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
