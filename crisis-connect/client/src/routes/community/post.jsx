import { Card } from "@mui/material";
import { color } from "@mui/system";
import {Link} from "react-router-dom";
import {format} from "date-fns";

const Post = ({_id,title,summary,cover,content,createdAt,author}) => {
    return(
        <Card className="post" sx={{  padding:" 0", color:"black"}}>
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={'http://localhost:4000/'+cover} alt=""/>
          </Link>
        </div>
        <div className="texts">
          <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
          </Link>
          <p className="info">
            <Link to={'/'} className="author">{author.username}</Link> 
            <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </Card>
    )
}

export default Post;