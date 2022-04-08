import "./Midbar.css"
import Share from "../share/Share"
import Post from "../post/Post"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"

export default function Midbar({ userId }) {
  const [posts, setPosts] = useState([]);
  const {user:curUser} = useContext(AuthContext);
  // // useEffect的第二个参数只要发生改变则箭头函数就会执行一次
  // const [text,setText] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      //获取跟某用户相关的时间线帖子
      const res = userId
        // 为啥这里必须多加一斜杠？？？当前主页面url最后没有斜杠，要加上形成
        ? await axios.get("/post/profile/" + userId)
        : await axios.get("/post/timeline/"+curUser._id);
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }));
    }
    fetchPosts();
  }, [userId,curUser]);
  // console.log(user)

  return (
    <div className="midbar">
      {/* <input type="text" onChange={e=>setText(e.target.value)} /> */}
      <div className="midbarWrapper">
        {(!userId || userId === curUser._id) &&<Share  />}
        {/* 虚拟-->真实 */}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}

      </div>
    </div>
  )
}
