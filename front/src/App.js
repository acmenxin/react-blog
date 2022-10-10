import { Component } from "react";
import { PureComponent,Suspense,lazy } from "react"
import {Route,Switch} from "react-router-dom"
import Header from "./components/Header";
import Home from "./pages/Home"
const Login = lazy(()=>import("./pages/Login"))
const Regist= lazy(()=>import("./pages/Regist"))
//问题： 页面加载慢
// 代码分割 => 并行 动态加载=> react 懒加载
// 页面无关的组件=>拆分成新的buddle=>当无关的组件被渲染的时候 才会下载到本地=>动态渲染
// 具体实现： React.lazy + import =>动态加载  ； Suspense 组件： 异步加载资源 显示友好信息
class App extends PureComponent{
  render(){
    return(
      <div>
      <Header />
      
      <Suspense fallback={<h2>Loading..</h2>}>
      <Switch>
      <Route path="/" component={Home} exact/>
      <Route path="/login" component={Login} />
      <Route path="/regist" component={Regist} />
      </Switch>
      </Suspense>

      </div>
    )
  }
}
export default App