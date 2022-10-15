import * as constant from '../constant'
import request  from '../request'
export const unload = ()=>{
    return {type:constant.ARTICLE_UNLOAD}
} 
//评论字段同步
export const commentFieldUpdate = (key,value)=>{
     return {type:constant.COMMENT_UPDATE_FIELD,key,value}
}
// 创建评论
export const createComment = (slug,body)=>{
    return async (dispatch,getState)=>{
        try {
           const result = await  request.comment.create(slug,body)
           console.log(result)
           dispatch({type:constant.COMMENT_CREATE_RESULT,result})  //result  : {status:0,message:result.message,errors:result.errors}
        } catch (error) { // 错误
            console.log(error);
            dispatch({type:constant.COMMENT_CREATE_RESULT,result:{message:error.message,errors:error.errors}})
        }
        
    }
}
// 删除评论
export const deleteComment = (slug,id)=>{
    return async (dispatch,getState)=>{
        try {
           const result = await  request.comment.delete(slug,id)
           console.log(result)
           dispatch({type:constant.COMMENT_DELETE_RESULT,result:{...result,id}})  //result  : {status:0,message:result.message,errors:result.errors}
        } catch (error) { // 错误
            console.log(error);
            dispatch({type:constant.COMMENT_DELETE_RESULT,result:{message:error.message,errors:error.errors}})
        }
        
    }
}

//初始化评论列表 初始获取所有评论
export const initComments = (slug)=>{
    return async (dispatch,getState)=>{
        try {
           const result = await  request.comment.get(slug)
           console.log(result)
           dispatch({type:constant.COMMENTS_GET_RESULT,result})  //result  : {status:0,message:result.message,errors:result.errors}
        } catch (error) { // 错误
            console.log(error);
            dispatch({type:constant.COMMENTS_GET_RESULT,result:{message:error.message,errors:error.errors}})
        }
        
    }
}




