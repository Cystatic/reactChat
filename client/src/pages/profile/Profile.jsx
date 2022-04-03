import "./Profile.css"
import Topbar from "../../components/topbar/Topbar"
import Leftbar from "../../components/leftbar/Leftbar"
import Midbar from "../../components/midbar/Midbar"
import Rightbar from "../../components/rightbar/Rightbar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const params = useParams();
    // console.log(params)//可以获得url的值
    const userId = params.userId;
    const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            //获取跟某用户相关的时间线帖子
            const res = await axios.get("/users/" + userId)
            setUser(res.data);
        }
        fetchUser();
    }, [userId]);


    return (
        <>
            <Topbar />
            <div className="profile">
                <Leftbar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={user.coverPicture ? PF + user.coverPicture : PF + "person/noCover.png"}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Midbar user={user} userId={userId} />
                        <Rightbar user={user} />
                    </div>
                </div>

            </div>
        </>
    )
}
