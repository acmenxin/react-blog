import { Component } from "react";
import * as action from "./actions/user"
import { getData } from "./utils/localstorage";
import { PureComponent,Suspense,lazy } from "react"
import { connect } from "react-redux";
import {Route,Switch} from "react-router-dom"
import Header from "./components/Header";
import Home from "./pages/Home"
const Login = lazy(()=>import("./pages/Login"))
const Regist= lazy(()=>import("./pages/Regist"))
const Profile = lazy(()=>import("./pages/profile"))
const Setting = lazy(()=>import("./pages/Setting"))


//问题： 页面加载慢
// 代码分割 => 并行 动态加载=> react 懒加载
// 页面无关的组件=>拆分成新的buddle=>当无关的组件被渲染的时候 才会下载到本地=>动态渲染
// 具体实现： React.lazy + import =>动态加载  ； Suspense 组件： 异步加载资源 显示友好信息
class App extends PureComponent{
  render(){
    return(
      <div>
      <Header currentUser={this.props.currentUser}/>
      <Suspense fallback={<h2>Loading..</h2>}>
      <Switch>
      <Route path="/" component={Home} exact/>
      <Route path="/login" component={Login} />
      <Route path="/regist" component={Regist} />
      <Route path="/setting" component={Setting} />
      <Route path="/profile/:username" component={Profile} />
      </Switch>
      </Suspense>

      </div>
    )
  }

  componentDidMount(){
    // 本地获取用户信息
    const currentUser = getData("currentUser")
    if(currentUser){
      //同步到仓库state : 本地磁盘数据 => 同步到内存空间
      this.props.syncUser(currentUser)
    }
  }
}
const mapStateToProps=state=>({currentUser:state.user.currentUser})

// 初始先同步本地用户信息
const mapDispatchToProps = dispatch=>({
  syncUser:(user)=>dispatch(action.userSyncResult(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App)