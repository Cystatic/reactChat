import "./Post.css"
import { MoreVert } from "@mui/icons-material"
import { useState, useEffect } from "react"
import axios from "axios"
import {format} from "timeago.js"

export default function Post({ post }) {
    // 找到用户id为1的用户
    // const user = Users.filter(u=>u.id===1);
    // console.log(user[0].username);

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    useEffect(() => {
        const fetchUser = async () => {
            //获取某用户信息
            const res = await axios.get("users/6243be4064d4c2afa07d671a");
            setUser(res.data);
        }
        fetchUser();
    }, []);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="postProfileImg" />
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={post.img ? (PF + post.img) : ""}
                        alt=""
                        className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={PF + "like.png"} alt="" className="likeIcon" onClick={likeHandler} />
                        <img src={PF + "heart.png"} alt="" className="likeIcon" onClick={likeHandler} />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
