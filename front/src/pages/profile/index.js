import { PureComponent ,Component} from "react";
import { connect } from "react-redux";
import ButtonInfo from "./ButtonInfo"
import * as action from "../../actions/profile"
import {getArticlesByAuthor,getArticlesByFavorite} from "../../actions/articles"
import Articles from "../Articles";
class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            username:props.match.params.username,
            tab:1
        }
    }
    //  性能优化
  //  shouldComponentUpdate(nextProps,nextState){
  //   // nextProps 是最新准确的
  //   const urlUsername = nextProps.match.params.username
  //   console.log('urlUsername',urlUsername); 
  //   console.log('profileUsername',this.props.profile.username); 
  //   console.log(this.props.profile,nextProps.profile)
  //   if(this.props.profile.username !== urlUsername){
  //       console.log("true");
  //     return true
  //   }
  //   if(this.props.profile.username === nextProps.profile.username){
  //           return false
  //         }
  //   return true
  //  }
    render(){
        const {profile,currentUser,addFollow,unFollow} = this.props
        const isCurrentUser = currentUser && currentUser.username ===profile.username
        return( 
            <div className='profile-page'>
          {/* 1 用户信息 */}
          <div className='user-info'>
            <div className='container'>
                <div className='row'>
                  <div className='col-xs-12 col-md-10 offset-md-1'>
                  {/* 1.1 用户基本：头像 用户名 简介 */}
                  <img src={profile.avatar||"https://yudafeng.github.io/static/default.png"} style={{width:200,height:200}}/>
                  <h4>{profile.username}</h4>
                  <p>{profile.bio}</p>
                  {/* 1.2 用户行为：自己页面 编辑设置； 不是自己页面 关注/取消关注 */}
                  {/*  登录用户（a） 和 profile用户(a||b) : 按钮显示*/}
                  <ButtonInfo 
                    isCurrentUser={isCurrentUser}
                    profile={profile}
                    addFollow={addFollow}
                    unFollow={unFollow}
                  />
                  </div>
                </div>
            </div>
          </div>
          <div className='container'>
          <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                {/* 选项卡 */}
                <div className='aticles-toggle'>
                      <ul className="nav nav-pills outline-active">
                          <li className='nav-item'>
                              <button
                                className={this.state.tab===1?"nav-link active" : "nav-link"}
                                onClick={
                                    ()=>{
                                      this.setState({
                                        tab:1
                                      })

                                      this.props.getArticlesByAuthor(this.state.username)
                                    }
                                }
                              >
                                我的文章
                              </button>
                          </li>
                          <li className='nav-item'>
                              <button
                               className={this.state.tab===2?"nav-link active" : "nav-link"}
                               onClick={
                                ()=>{
                                    this.setState({
                                      tab:2
                                    })
                                    this.props.getArticlesByFavorite(this.state.username)
                                  }
                              }
                               >
                                喜欢文章
                              </button>
                          </li>
                      </ul>
                </div>
                {/* 文章列表 被封装成组件了哈*/}
                <Articles 
                 articles={this.props.articles.articles}
                />
              </div>
          </div>
        </div>
          </div>
        )
    }
    componentDidMount(){
        console.log("componentDidMount");
        this.props.getProfile(this.state.username)
        this.props.getArticlesByAuthor(this.state.username)
    }
}

const mapStateToProps =state=>({
    currentUser:state.user.currentUser,
    profile:state.profile,
    articles:state.articles
})
const mapDispatchToProps = dispatch=>({
    getProfile:(username)=>dispatch(action.getProfile(username)),
    addFollow:(username)=>dispatch(action.addFollow(username)),
    unFollow:(username)=>dispatch(action.unFollow(username)),
    getArticlesByAuthor:(username)=>dispatch(getArticlesByAuthor(username)),
    getArticlesByFavorite:(username)=>dispatch(getArticlesByFavorite(username))

})
export default connect(mapStateToProps,mapDispatchToProps)(Profile)