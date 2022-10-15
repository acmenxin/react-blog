
import * as constant from '../../constant'
import {savaData,deleteData} from '../../utils/localstorage';

const initState={
    title:"",
    description:"",
    body:"", // body 文章body
    tags:[],
    tag:'',
    errors:null,
}

const articleNewReducer = (state=initState,action)=>{
    switch (action.type) {
        case constant.ARTICLE_UNLOAD: 
            return {...initState}
        case constant.ARTICLE_UPDATE_FIELD: //同步字段
            const key  = action.key
            const value  = action.value
            return {...state,[key]:value}
        case constant.ARTILE_ADD_TAG: // 添加标签
           const tags = state.tags.concat([state.tag])
            return {...state,tag:"",tags}
        case constant.ARTILE_REMOVE_TAG: // 移除标签
           const removeTag = action.payload
           const filerTags =  state.tags.filter(tag=>tag!==removeTag)
            return {...state,tags:filerTags}
        case constant.ARTICLE_CREATE_RESULT: // 创建文章结果 ： 错误
            return {...state,errors:{message:action.result.message}}
        case constant.ARTICLE_UPDATE_RESULT: // 创建文章结果 ： 错误
            return {...state,errors:{message:action.result.message}}
        case constant.ARTICLE_GET_RESULT: // 文章详情
            if(action.result.status===1){ 
                return {...state,...action.result.data}
            }else{
                return {...state,errors:{message:action.result.message}} //{message，errors}
            }
        case constant.ARTICLE_FAVORITE_RESULT: // 文章喜欢
            if(action.result.status===1){ 
                return {...state,...action.result.data}
            }else{
                return {...state,errors:{message:action.result.message}} //{message，errors}
            }
        default:
            break;
    }

    return state
}

export default articleNewReducer