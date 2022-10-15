import { memo } from "react"
import user from "../../../request/user"
import {Link} from 'react-router-dom'
// articleSlug: "eff5dcc2"
// body: "sss"
// createdAt: "2022-06-28T03:08:29.000Z"
// id: 10
// updatedAt: "2022-06-28T03:08:29.000Z"
// user: {username: 'yudafeng', avatar: null, bio: 'less is more'} //评论人
// userEmail: "yudafeng@qq.com"

const CommentItem = (props)=>{
    const {comment,currentUser,deleteComment,slug} = props
    const showDelete = currentUser&&comment && currentUser.username === comment.user.username
    return (
        <div className="card">
            {/* 评论内容 */}
            <div className="card-block">
                <p className="card-text">{comment.body}</p>
            </div>
            {/* 评论人信息 */}
            <div className="card-footer">
                <Link to={`/profile/${comment.user.username}`}  className="comment-author">
                    <img 
                    className="comment-author-img"
                     src={comment.user.avatar || "https://yudafeng.github.io/static/default.png"}
                    />
                </Link>
                {" "}
                <Link to={`/profile/${comment.user.username}`}  className="comment-author">
                   {comment.user.username}
                </Link>
                {" "}
                <span>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
                {/* 删除按钮：登录用户 = 评论用户 */}
                {
                   showDelete ? <button className="mod-options  btn-dangerous"
                    onClick={()=>{
                        deleteComment(slug,comment.id)
                    }}
                   >删除</button> : null
                }
            </div>
        </div>
    )
}

export default memo(CommentItem)