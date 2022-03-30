import "./Midbar.css"
import Share from "../share/Share"
import Post from "../post/Post"

export default function Midbar() {
  return (
    <div className="midbar">
        <div className="midbarWrapper">
          <Share/>
          <Post/>
        </div>
    </div>
  )
}
