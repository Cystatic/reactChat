import "./Rightbar.css"
import {Users} from "../../dummyData"
import OnlineFriend from "../onlineFriend/OnlineFriend"

export default function Rightbar() {
  return (
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
          {Users.map((u)=>(
            <OnlineFriend key={u.id} user={u}/>
          ))}
        </ul>
      </div>
    </div>
  )
}
