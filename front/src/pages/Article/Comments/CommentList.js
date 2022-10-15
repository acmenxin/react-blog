import CommentItem from './CommentItem'
import {memo} from 'react'

const CommentList =  (props)=>{
    const {comments,currentUser,deleteComment} = props
    if(comments.length===0){
        return <div>当前还没有评论</div>
    }else{
        return (
            <div>
                {
                   props.comments.map(comment=>{
                        return <CommentItem key={comment.id} 
                                            comment={comment} 
                                            currentUser={currentUser} 
                                            deleteComment={deleteComment}
                                            slug={props.slug}
                                            />
                   }) 
                }
            </div>
        )
    }

}

export default memo(CommentList)