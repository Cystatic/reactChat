import "./Leftbar.css"
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from '@mui/icons-material'
import Friend from "../friend/Friend"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
// import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { useSelector } from "react-redux"


export default function Leftbar() {

  const user = useSelector((state) => state.user.userInfo);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get("/users/allUsers/" + user._id)
        setAllUsers(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getAllUsers()
  }, [user])
  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <ul className="leftbarList">
          <li className="leftbarListItem">
            <RssFeed className="leftbarIcon" />
            <span className="leftbarListItemText">社群</span>
          </li>
          <li className="leftbarListItem">
            <Link to={"/messenger"}>
              <Chat className="leftbarIcon" />
            </Link>
            <span className="leftbarListItemText">聊天</span>
          </li>
          <li className="leftbarListItem">
            <PlayCircleFilledOutlined className="leftbarIcon" />
            <span className="leftbarListItemText">视频</span>
          </li>
          <li className="leftbarListItem">
            <Link to={"/groupChat"}>
              <Group className="leftbarIcon" />
            </Link>
            <span className="leftbarListItemText">群组</span>

          </li>
          <li className="leftbarListItem">
            <Bookmark className="leftbarIcon" />
            <span className="leftbarListItemText">书签</span>
          </li>
          <li className="leftbarListItem">
            <HelpOutline className="leftbarIcon" />
            <span className="leftbarListItemText">帮助</span>
          </li>
          <li className="leftbarListItem">
            <WorkOutline className="leftbarIcon" />
            <span className="leftbarListItemText">求职</span>
          </li>
          <li className="leftbarListItem">
            <Event className="leftbarIcon" />
            <span className="leftbarListItemText">事件</span>
          </li>
          <li className="leftbarListItem">
            <School className="leftbarIcon" />
            <span className="leftbarListItemText">课程</span>
          </li>
        </ul>
        <button className="leftbarButton">更多Info</button>
        <hr className="leftbarHr" />
        <ul className="leftbarFriendList">
          {allUsers.map((u) => (
            <Friend key={u._id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  )
}
