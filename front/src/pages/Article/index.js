import { PureComponent } from "react";
import * as action from '../../actions/article'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import {marked} from 'marked'
import CommentContainer from './Comments'
import article from "../../request/article";
import ArticleAction from "./ArticleAction";
/**
 * 文章详情
 *  01 文章slug
 *  02 slug 获取文章详情数据
 *  03 数据回显
 *      头信息 ： 标题  作者  /（别人文章 ：关注 喜欢） || {自己的文章：修改 删除}
 *      文章信息 ： 内容 / 标签
 *              markdown => html        
 *      评论信息 ：添加评论 / 评论别表
 *               未登录 ： 评论列表
 *               已登录 ： 添加评论 / 评论别表     
 */
class Article extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            slug: props.match.params.slug //获取文章唯一slug
        }
    }
    componentDidMount() {
        const slug = this.props.match.params.slug
        // 02 slug 获取文章详情数据
        this.props.getArticleBySlug(slug)
    }
    render() {
        const {article,currentUser,} = this.props
        const { slug, title, description, body, tags, author, createdAt } = article 
        if(!body){
            return null
        }
        // markdown =>html
        // demo
        // const markdata = "# hello" //
        // const markhtml = "<h1>hello</h1>"
        // const markreact = <div dangerouslySetInnerHTML={markhtml}></div>
        const markdata = body
        const markhtml = marked.parse(markdata,{sanitize:true})
        // const markreact = <div dangerouslySetInnerHTML={markhtml}></div>
        const markobj  ={__html:markhtml}
        return (
            <div className='article-page'>
                {/* 头信息 ： 标题  作者  /（别人文章 ：关注 喜欢） || {自己的文章：修改 删除} */}
                <div className='banner'>
                    <div className='container'>
                        <h1>{title}</h1>
                        <div className='article-meta'>
                            <div className="info">
                                {/* 头像 */}
                                <Link to={`/profile/${author && author.username}`}>
                                    <img src={author && author.avatar || "https://yudafeng.github.io/static/default.png"} alt={author && author.username} />
                                </Link>
                            </div>
                            {/* 作者名称 & 创建时间 */}
                            <div className="info">
                                <Link to={`/profile/${author && author.username}`} >
                                    {author && author.username}
                                </Link>
                                {" "}
                                <span >
                                    {new Date(createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            {/* button : （别人文章 ：关注 喜欢） || {自己的文章：修改 删除} */}
                            <ArticleAction  article={article} currentUser={currentUser}/>
                        </div>
                    </div>
                </div>
                {/* 文章信息 ： 内容 / 标签 */}
                <div className="row article-content">
                    <div className="col-xs-12">
                        {/* 文章内容 */}
                        {/* must be in the form `{__html: ...} */}
                        <div dangerouslySetInnerHTML={markobj}></div>
                        {/* 显示标签 */}
                        <ul className='tag-list'>
                        {
                                tags.map(tag=>{
                                    return (
                                        <li
                                        className='tag-default tag-pill' 
                                        key={tag}>
                                          {tag}
                                        </li>
                                    )
                                })
                             }
                        </ul>
                    </div>
                </div>
                {/* 评论信息 */}
                {/* 评论信息 ：添加评论 / 评论别表
                未登录 ： 评论列表
                已登录 ： 添加评论 / 评论列表    */}
                <CommentContainer 
                    currentUser={currentUser}
                    slug={slug}
                />
            </div>
        )
    }  
    componentWillUnmount(){
        // TODO : 清除store 文章缓存

    }
}
const mapState = state => ({
    article:state.article,
    ...state.user
})
const mapDispatch = dispatch => ({
    getArticleBySlug: (slug) => dispatch(action.getArticleBySlug(slug)),
    
})
export default connect(mapState, mapDispatch)(Article)