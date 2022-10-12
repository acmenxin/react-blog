import {PureComponent } from "react";
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import * as action from "../../actions/user"
import Errors from "../../components/Errors";
class Login extends PureComponent{
    changeEmail=(e)=>{
        // console.log("onEmailChange1");
          this.props.onEmailChange("email",e.target.value)
      }
      changePassword=(e)=>{
        // this.setState({
        //   password:e.target.value
        // })
        this.props.onPasswordChange("password",e.target.value)
      }
   onSubmitForm = (email,password)=>(e)=>{
    e.preventDefault()
    // console.log(this.state);
    //网络接口请求 ： 注册
    this.props.onSubmitUser({email,password})
  }
    render(){
      const {email,password,errors} = this.props
        return(
            <div className="container page">
             <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
              <h1>登录</h1>
              <p className='text-xs-center'>
              <Link to='/regist'>
                  没有账号？点击注册
              </Link>
              </p>
              <Errors errors={errors}/>
              <form onSubmit={this.onSubmitForm(email,password)}>
               <fieldset className='form-group'>
                <input type="text" 
                  className="form-control form control-lg"
                  placeholder="用户邮箱"
                  value={email}
                  onChange={this.changeEmail}
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
               >登录</button>
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
    onPasswordChange:(key,value)=>dispatch(action.registUpdate(key,value)),
    onSubmitUser:(email,password)=>dispatch(action.loginSubmit(email,password)),
    onUnload:()=>dispatch(action.unload())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)