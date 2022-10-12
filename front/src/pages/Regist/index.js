import {PureComponent } from "react";
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import * as action from "../../actions/user"
import Errors from "../../components/Errors";
class Regist extends PureComponent{
  //组件自己的状态/组件公共的状态
  // constructor(props){
  //   super(props)
  //   console.log(props,"props");
  // }
  changeEmail=(e)=>{
    // console.log("onEmailChange1");
      this.props.onEmailChange("email",e.target.value)
  }
  changeUsername=(e)=>{
    // this.setState({
    //   username:e.target.value
    // })
    this.props.onUsernameChange("username",e.target.value)
  }
  changePassword=(e)=>{
    // this.setState({
    //   password:e.target.value
    // })
    this.props.onPasswordChange("password",e.target.value)
  }
  /**
   * 提交的时候为什么会整体刷新？
   * 函数会有一个默认事件对象 preventDefault()，阻止默认行为
   * 拿数据 进行数据校验，如果不行的话就要显示错误。 自己做校验。
   * thunk 做副作用操作的，可以在action中就捕获错误的
   * */
   onSubmitForm = (email,username,password)=>(e)=>{
    e.preventDefault()
    // console.log(this.state);
    //网络接口请求 ： 注册
    this.props.onSubmitUser({email,username,password})
  }
    render(){
      const {email,username,password,errors} = this.props
        return(
            <div className="container page">
             <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
              <h1>注册</h1>
              <p className='text-xs-center'>
              <Link to='/login'>
                  有账号直接登录?
              </Link>
              </p>
              <Errors errors={errors}/>
              <form onSubmit={this.onSubmitForm(email,username,password)}>
               <fieldset className='form-group'>
                <input type="text" 
                  className="form-control form control-lg"
                  placeholder="用户邮箱"
                  value={email}
                  onChange={this.changeEmail}
                />
               </fieldset>
               <fieldset className='form-group'>
                <input type="text" 
                  className="form-control form control-lg"
                  placeholder="用户名称"
                  value={username}
                  onChange={this.changeUsername}
                />
               </fieldset>
               <fieldset className='form-group'>
                <input type="password" 
                  className="form-control form control-lg"
                  placeholder="用户密码"
                  value={password}
                  onChange={this.changePassword}
                />
               </fieldset>
               <button  className='btn btn-lg btn-primary pull-xs-right'
                 type="submit"
               >注册</button>
              </form>
              </div>
              </div>
            </div>
        )
    }
    componentWillUnmount(){
      //清理工作
      this.props.onUnload()
    }
}
//数据
const mapStateToProps = state =>({...state.user}) //state为根reducer,找user对应的state
//行为
const mapDispatchToProps = dispatch=>{
  return{
    onEmailChange:(key,value)=>dispatch(action.registUpdate(key,value)),
    onUsernameChange:(key,value)=>dispatch(action.registUpdate(key,value)),
    onPasswordChange:(key,value)=>dispatch(action.registUpdate(key,value)),
    onSubmitUser:(user)=>dispatch(action.registSubmit(user)),
    onUnload:()=>dispatch(action.unload())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Regist)