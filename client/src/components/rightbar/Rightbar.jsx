import "./Rightbar.css"
import OnlineFriend from "../onlineFriend/OnlineFriend"
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { followCall, unfollowCall } from "../../redux/apiCalls";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // const { user: curUser, dispatch } = useContext(AuthContext);
  const curUser = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const [friends, setFriends] = useState([])

  const [followed, setFollowed] = useState(
    curUser?.followings.includes(user?._id)
  );

  useEffect(()=>{
    setFollowed(curUser?.followings.includes(user?._id))
  },[user,curUser])

  console.log(followed)
  // const handleClick = async() => {
  //   try{
  //     if(followed){
  //       await axios.put(`/users/${user._id}/unfollow`, {
  //         userId: curUser._id,
  //       });
  //       dispatch({ type: "UNFOLLOW", payload: user._id });
  //     }else{
  //       await axios.put(`/users/${user._id}/follow`, {
  //         userId: curUser._id,
  //       });
  //       dispatch({ type: "FOLLOW", payload: user._id });
  //     }
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  const handleClick = async () => {
    try {
      if (followed) {
        unfollowCall({userId:curUser._id,friendId:user._id},dispatch)
      } else {
        followCall({userId:curUser._id,friendId:user._id},dispatch)
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };


  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = user
          ? await axios.get(`/users/friends/${user._id}`)
          : await axios.get(`/users/friends/${curUser._id}`);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user, curUser]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img crossOrigin="anonymous" src={PF + "gift.png"} alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Jack</b> and <b>3 friends</b>  have a birthday today
          </span>
        </div>
        <img crossOrigin="anonymous" src={PF + "/ad.png"} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {friends.map((friend) => (
            <OnlineFriend key={friend._id} friend={friend} />
          ))}
        </ul>

      </>
    )
  };
  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== curUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">????????????</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">??????:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">??????:</span>
            <span className="rightbarInfoValue">{user.from} </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">??????:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "Other"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">????????????</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={"/profile/" + friend._id}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  crossOrigin="anonymous"
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}

        </div>
      </>
    )
  };
  return (
    <>
      <div className="rightbar">
        <div className="rightbarWrapper">
          {user ? <ProfileRightbar /> : <HomeRightbar />}
        </div>
      </div>
    </>
  )
}
