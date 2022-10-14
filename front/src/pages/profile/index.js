import { PureComponent ,Component} from "react";
import { connect } from "react-redux";
import ButtonInfo from "./ButtonInfo"
import * as action from "../../actions/profile"
class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            username:props.match.params.username,
        }
    }
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

          </div>
        )
    }
    componentDidMount(){
        console.log("componentDidMount");
        this.props.getProfile(this.state.username)
    }
}

const mapStateToProps =state=>({
    currentUser:state.user.currentUser,
    profile:state.profile
})
const mapDispatchToProps = dispatch=>({
    getProfile:(username)=>dispatch(action.getProfile(username)),
    addFollow:(username)=>dispatch(action.addFollow(username)),
    unFollow:(username)=>dispatch(action.unFollow(username))

})
export default connect(mapStateToProps,mapDispatchToProps)(Profile)