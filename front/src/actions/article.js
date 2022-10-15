import * as constant from "../constant"
import request from "../request"
import { push } from "connected-react-router"
export const unload = ()=>{
    return {type:constant.ARTICLE_UNLOAD}
} 
//字段同步
export const articleFieldUpdate = (key,value)=>{
    return {type:constant.ARTICLE_UPDATE_FIELD,key,value}
}
//创建标签
export const articleAddTag = ()=>{
    return {type:constant.ARTILE_ADD_TAG}
} 

// 创建文章
export const createArticle = (article)=>{
    return async (dispatch,getState)=>{
        try {
           const result = await  request.article.create(article)
            if(result.status===1){ // 成功 status 1
                const {slug} = result.data
                dispatch(push(`/articles/${slug}`)) //触发跳转 //router + redux
            }else{// 失败 status 0
                dispatch({type:constant.ARTICLE_CREATE_RESULT,result})  //result  : {status:0,message:result.message,errors:result.errors}
            }
        } catch (error) { // 错误
            console.log(error);
            dispatch({type:constant.USER_REGIST_RESULT,result:{message:error.message,errors:error.errors}})
        } 
    }
}
//移除标签
export const articleRemoveTag = (tag)=>{
    return {type:constant.ARTILE_REMOVE_TAG,payload:tag}
} 

