import "./Profile.css"
import Topbar from "../../components/topbar/Topbar"
import Leftbar from "../../components/leftbar/Leftbar"
import Midbar from "../../components/midbar/Midbar"
import Rightbar from "../../components/rightbar/Rightbar"

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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
                                src={`${PF}post/3.jpeg`}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={`${PF}person/6.jpeg`}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">caosy</h4>
                            <span className="profileInfoDesc">受命于天，既寿永昌</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Midbar/>
                        <Rightbar profile/>
                    </div>
                </div>

            </div>
        </>
    )
}
