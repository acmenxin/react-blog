import * as constant from "../constant"
import request from "../request"
import { push } from "connected-react-router"
//字段同步
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
           dispatch (push("/login")) //触发跳转
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