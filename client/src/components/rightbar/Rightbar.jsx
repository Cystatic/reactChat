import "./Rightbar.css"
import { Users } from "../../dummyData"
import OnlineFriend from "../onlineFriend/OnlineFriend"

export default function Rightbar({ prfile }) {
  const HomeRightbar = () => {
    return (
      <>
        <div className="rightbar">
          <div className="rightbarWrapper">
            <div className="birthdayContainer">
              <img src="/assets/gift.png" alt="" className="birthdayImg" />
              <span className="birthdayText">
                <b>Jack</b> and <b>3 friends</b>  have a birthday today
              </span>
            </div>
            <img src="/assets/ad.png" alt="" className="rightbarAd" />
            <h4 className="rightbarTitle">Online Friends</h4>
            <ul className="rightbarFriendList">
              {Users.map((u) => (
                <OnlineFriend key={u.id} user={u} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  };
  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">用户信息</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">城市:</span>
            <span className="rightbarInfoValue">苏州</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">家乡:</span>
            <span className="rightbarInfoValue">六安 </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">关系:</span>
            <span className="rightbarInfoValue">Single
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">用户朋友</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="assets/person/1.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/2.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/3.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/4.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/5.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/7.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/9.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/8.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
        </div>
      </>
    )
  };
  return (
    <>
      <div className="rightbar">
        <div className="rightWrapper">
          <ProfileRightbar />
        </div>
      </div>
    </>
  )
}
