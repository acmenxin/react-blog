import * as constant from "../constant"
//字段同步
export const registUpdate = (key,value)=>{
    // console.log("registUpdate2");
    return {type:constant.USER_REGIST,key,value}
}
//提交
//redux-thunk处理副作用  fetch
export const registSubmit =(user)=>{


    //一旦是函数，thunk就拦截
    return (dispatch,getState)=>{
        //网络请求

        //成功 1

        //失败 0

        //失败出现错误 500
    }
}