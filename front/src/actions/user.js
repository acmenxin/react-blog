import * as constant from "../constant"
import request from "../request"
import { push } from "connected-react-router"

//跳转页面后清理数据
export const unload = ()=>{
    return {type:constant.USER_UNLOAD}
}

//输入字段同步
export const registUpdate = (key,value)=>{
    return {type:constant.USER_REGIST,key,value}
}
//注册提交
//redux-thunk处理副作用  fetch
export const registSubmit =({email,username,password})=>{
    //一旦是函数，thunk就拦截
    return async(dispatch,getState)=>{
        try {
        //网络请求
        const result = await request.user.regist(email,username,password)
        //成功 1
        if(result.status===1){
            //跳转login页面
           dispatch (push("/login")) //触发跳转 ：路由写在了action中，router写在了redux中，利用connected
        }
        //失败 0
        else{
            dispatch({type:constant.USER_REGIST_RESULT,result})
        }
        //失败出现错误 500
        } catch (error) {
            dispatch({type:constant.USER_REGIST_RESULT,result:{message:error.message,errors:error.errors}})
        }
      
    }
}
//登录提交
export const loginSubmit =(email,password)=>{
    return async(dispatch,getState)=>{
        try {
        //网络请求
        const result = await request.user.login(email,password)
        //成功 1
            dispatch({type:constant.USER_LOGIN_RESULT,result})
        //失败出现错误 500
        } catch (error) {
            dispatch({type:constant.USER_LOGIN_RESULT,result:{status:0,message:error.message,errors:error.errors}})
        }
      
    }
}
//同步登录
export const userSyncResult=(user)=>{
    return {type:constant.USER_SYNC_RESULT,result:user}
}
//更新提交
export const updateSubmit=(user)=>{
    return async(dispatch,getState)=>{
        try {
            const result = await request.user.update(user)
            // console.log(result,"result");
            dispatch({type:constant.USER_UPDATE_RESULT,result})
        } catch (error) {
            dispatch({type:constant.USER_UPDATE_RESULT,result:{status:0,message:error.message,errors:error.errors}})
        }
    }
}
//退出登录
export const logout = ()=>{
    return {type:constant.USER_SETTING_LOGOUT}
  }
  