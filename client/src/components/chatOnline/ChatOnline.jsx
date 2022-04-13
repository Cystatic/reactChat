import axios from "axios";
import { useEffect, useState } from "react";
import "./ChatOnline.css"

export default function ChatOnline({onlineUsers,curUserId,setCurChat}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [allFriends,setAllFriends] = useState([])
  const [onlineFriends,setOnlineFriends] = useState([])

  useEffect(()=>{
    const getAllFriends = async()=>{
      try{
        const res = await axios.get("/users/friends/"+curUserId);
        setAllFriends(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getAllFriends()
  },[curUserId])

  useEffect(()=>{
    setOnlineFriends(allFriends.filter((f)=>onlineUsers.includes(f._id)))
  },[allFriends,onlineUsers])

  const handleClick = async (user) => {
    try {
      let res = await axios.get(
        `/conversation/find/${curUserId}/${user._id}`
      );
      if(res.data===null){
        res = await axios.post("/conversation",{senderId:user._id,recieverId:curUserId})
      }
      setCurChat(res.data);
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
        {  onlineFriends.map((o)=>(
       
        <div  key={o._id} className="chatOnlineFriend" onClick={()=>handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              crossOrigin="anonymous"
              className="chatOnlineImg"
              src={
                o?.profilePicture?
                PF + o.profilePicture:
                PF + "person/noAvatar.png"
              }
              alt=""
              />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
        ))}
    </div>
  );
}
