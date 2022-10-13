import { PureComponent } from "react";
import { connect } from "react-redux";
import ButtonInfo from "./ButtonInfo"
import * as action from "../../actions/profile"
// const mock = {
//   profile: {
//     username: 'guojiaxin',
//     avatar: 'https://yudafeng.github.io/static/default.png',
//     bio: 'aa9 user info',
//     email: 'aa9@qq.com',
//     following: false
//   }
// }
class Profile extends PureComponent{
  
    constructor(){
        super()
        this.state={
            username:this.match.params.username,

        }
    }
    render(){
        const {profile} = this.props
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
                  />
                  </div>
                </div>
            </div>
          </div>

          </div>
        )
    }
    componentDidMount(){
        this.props.getProfile(this.state.username)
    }
}

const mapStateToProps =state=>({
    currentUser:state.user.currentUser,
    profile:state.profile
})
const mapDispatchToProps = dispatch({
    getProfile:(username)=>dispatch(action.getProfile(username))

})
export default connect(mapStateToProps,mapDispatchToProps)(Profile)