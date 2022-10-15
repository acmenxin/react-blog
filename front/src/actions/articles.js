import * as constant from "../constant"
import request from "../request"
//获取作者文章
export const getArticlesByAuthor =(username,page)=>{
    return async (dispatch,getState)=>{
        try {
          const result = await  request.article.getAuthor(username,page)
          dispatch({type:constant.ARTICLES_AUTHOR_RESULT,result})
        } catch (error) { // 错误
            console.log(error);
            dispatch({type:constant.ARTICLES_AUTHOR_RESULT,result:{status:0,message:error.message,errors:error.errors}})
        }
    }
}
export const getArticlesByFavorite =(username)=>{
    return async (dispatch,getState)=>{
        try {
          const result = await  request.profile.post(username)
          dispatch({type:constant.ARTICLES_LIKE_RESULT,result})
        } catch (error) { // 错误
            dispatch({type:constant.ARTICLES_LIKE_RESULT,result:{status:0,message:error.message,errors:error.errors}})
        }
    }
}
