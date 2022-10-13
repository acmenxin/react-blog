import * as constant from "../constant"
import request from "../request"
//点击头像展示用户信息
export const getProfile =(username)=>{
    return async (dispatch,getState)=>{
        try {
          const result = await  request.profile.get(username)
          dispatch({type:constant.PROFILE_GET_RESULT,result})
        } catch (error) { // 错误
            console.log(error);
            dispatch({type:constant.PROFILE_GET_RESULT,result:{status:0,message:error.message,errors:error.errors}})
        }
        
    }
}