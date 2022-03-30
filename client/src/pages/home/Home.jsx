import Topbar from "../../components/topbar/Topbar"
import Leftbar from "../../components/leftbar/Leftbar"
import Midbar from "../../components/midbar/Midbar"
import Rightbar from "../../components/rightbar/Rightbar"
import "./Home.css"
export default function Home() {
  return (
    <>
      <Topbar/>
      <div className="homeContainer">
        <Leftbar/>
        <Midbar/>
        <Rightbar/>
      </div>
    </>
  )
}
