import "./Post.css"
import { MoreVert } from "@mui/icons-material"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export default function Post({ post }) {
    // 找到用户id为1的用户
    // const user = Users.filter(u=>u.id===1);
    // console.log(user[0].username);

    //当前登录用户
    const { user: curUser } = useContext(AuthContext);

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        setIsLiked(post.likes.includes(curUser._id))
    }, [post.likes, curUser])

    const likeHandler = async () => {
        try {
            axios.put("/post/" + post._id + "/like", { userId: curUser._id })
        } catch (err) {

        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    //得到帖子作者
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            //获取某用户信息
            const res = await axios.get("/users/" + post.userId);
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId]);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user._id}`}>

                            <img crossOrigin="anonymous" src={user.profilePicture ? PF + user.profilePicture : PF + "/person/noAvatar.png"}
                                alt=""
                                className="postProfileImg" />
                        </Link>
                        <span className="postUsername">{user.username}</span>

                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img crossOrigin="anonymous" src={post.img ? (PF + post.img) : ""}
                        alt=""
                        className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img crossOrigin="anonymous" src={PF + "/like.png"} alt="" className="likeIcon" onClick={likeHandler} />
                        <img crossOrigin="anonymous" src={PF + "/heart.png"} alt="" className="likeIcon" onClick={likeHandler} />
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
