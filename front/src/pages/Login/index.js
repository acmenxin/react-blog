import {PureComponent } from "react";
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import * as action from "../../actions/user"
import Errors from "../../components/Errors";
import {store} from "../../store";
import { push,replace } from "connected-react-router";
class Login extends PureComponent{
    changeEmail=(e)=>{
          this.props.onEmailChange("email",e.target.value)
      }
      changePassword=(e)=>{
        this.props.onPasswordChange("password",e.target.value)
      }
   onSubmitForm = (email,password)=>(e)=>{
    e.preventDefault()
    //网络接口请求 ： 注册
    this.props.onSubmitUser(email,password)
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

    //componentDidUpdate处理副作用监听,是否重定向到首页
    componentDidUpdate(preProps){
        if(this.props.redirect && this.props.redirect!==preProps.redirect){
            // store.dispatch(push(this.props.redirect)) //直接push
            store.dispatch(replace(this.props.redirect)) //栈替换
        }
    }
    // componentWillUnmount(){
    //     //清理工作
    //     this.props.onUnload()
    //   }
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