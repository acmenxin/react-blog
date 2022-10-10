import {PureComponent } from "react";
import {Link} from "react-router-dom"
import {connect} from "react-redux"
class Regist extends PureComponent{
  state={
    email:'',
    username:'',
    password:""
  }
  changeEmail=(e)=>{
    this.setState({
      email:e.target.value
    })
  }
  changeUsername=(e)=>{
    this.setState({
      username:e.target.value
    })
  }
  changePassword=(e)=>{
    this.setState({
      password:e.target.value
    })
  }
  /**
   * 提交的时候为什么会整体刷新？
   * 函数会有一个默认事件对象 preventDefault()，阻止默认行为
   * 拿数据 进行数据校验，如果不行的话就要显示错误。 自己做校验。
   * thunk 做副作用操作的，可以在action中就捕获错误的
   * */
   onSubmitForm = ()=>(e)=>{
    console.log(this.state);
    //网络接口请求 ： 注册
    // this.props.onSubmitUser(this.state)
  }
    render(){
        return(
            <div className="container page">
             <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
              <h1>注册</h1>
              <form onSubmit={this.onSubmitForm()}>
               <fieldset className='form-group'>
                <input type="text" 
                  className="form-control form control-lg"
                  placeholder="用户邮箱"
                  value={this.state.email}
                  onChange={this.changeEmail}
                />
               </fieldset>
               <fieldset className='form-group'>
                <input type="text" 
                  className="form-control form control-lg"
                  placeholder="用户名称"
                  value={this.state.username}
                  onChange={this.changeUsername}
                />
               </fieldset>
               <fieldset className='form-group'>
                <input type="password" 
                  className="form-control form control-lg"
                  placeholder="用户密码"
                  value={this.state.password}
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
}
//数据
const mapStateProps = state =>{
 console.log(state.user,"mapStateProps");
}
//行为
const mapDispatchProps = dispatch=>{

}
export default connect(mapStateProps,mapDispatchProps)(Regist)