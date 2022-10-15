import {Link} from 'react-router-dom'
import {memo, PureComponent} from 'react'
import * as action from '../../../actions/comment'
import { connect } from 'react-redux';
import CommentList from './CommentList'
class CommentContainer extends PureComponent{
    handleChange = (e)=>{
       this.props.commentFieldUpdate('body',e.target.value)
    }
    createComment = (e)=>{
        e.preventDefault()
        const slug  = this.props.slug //文章slug
        const body  = this.props.body //评论内容
        this.props.createComment(slug,body)
    }
    deleteComment = (slug,id)=>{
        this.props.deleteComment(slug,id)
    }

    render(){
        const {currentUser,body} = this.props
        if(!currentUser){  // 未登录
            return (
                <div className="col-xs-12 col-md-8 offset-md-2">
                    {/* 登录和注册列表 */}
                    <p>
                        <Link to="/login">登录</Link>
                        &nbsp; or &nbsp;
                        <Link  to="/regist">注册</Link>
                    </p>
                    {/* 评论列表 */}
                    <CommentList comments={this.props.comments} />
                </div>
            )
        }else{
            return (
                <div className="col-xs-12 col-md-8 offset-md-2">
                    {/* 添加评论form */}
                    <form className="card comment-form" onSubmit={this.createComment}>
                        <div className="card-block">
                            <textarea
                              className="form-control"
                              placeholder="添加评论..."
                              rows={3}
                              onChange={this.handleChange}
                              value={body}
                            />
                        </div>
                        <div className="card-footer">
                            <img 
                            className="comment-author-img"
                            src={currentUser&&currentUser.avatar||"https://yudafeng.github.io/static/default.png"}
                            />
                            <button 
                            className="btn btn-sm btn-primary"
                            type="submit"
                            >
                                提交
                            </button>
                        </div>
                    </form>
                    {/* 评论列表 */}
                    <CommentList comments={this.props.comments} 
                                 currentUser={currentUser} 
                                 deleteComment={this.deleteComment}
                                 slug={this.props.slug}/>
                </div>
            )
        }
    }
    componentDidMount(){
        this.props.initComments(this.props.slug)
    }
}
const mapState = state => ({
   ...state.comment
})

const mapDispatch = dispatch=>({
    commentFieldUpdate:(k,v)=>dispatch(action.commentFieldUpdate(k,v)),
    createComment:(slug,body)=>dispatch(action.createComment(slug,body)),
    initComments:(slug)=>dispatch(action.initComments(slug)),
    deleteComment:(slug,id)=>dispatch(action.deleteComment(slug,id)),
})



export  default connect(mapState,mapDispatch)(CommentContainer)