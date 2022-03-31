import "./Midbar.css"
import Share from "../share/Share"
import Post from "../post/Post"
import { Posts } from "../../dummyData"

export default function Midbar() {
  return (
    <div className="midbar">
      <div className="midbarWrapper">
        <Share />
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}

      </div>
    </div>
  )
}
