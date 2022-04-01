import "./Midbar.css"
import Share from "../share/Share"
import Post from "../post/Post"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Midbar() {
  const [posts, setPosts] = useState([]);
  // // useEffect的第二个参数只要发生改变则箭头函数就会执行一次
  // const [text,setText] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      //获取跟某用户相关的时间线帖子
      const res = await axios.get("post/timeline/6243be4064d4c2afa07d671a");
      setPosts(res.data)
      
    }
    fetchPosts();
  }, []);


  return (
    <div className="midbar">
      {/* <input type="text" onChange={e=>setText(e.target.value)} /> */}
      <div className="midbarWrapper">
        <Share />
        {/* 虚拟-->真实 */}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}

      </div>
    </div>
  )
}
