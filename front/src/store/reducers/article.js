import * as constant from '../../constant'
import {savaData,deleteData} from '../../utils/localstorage';
const initState={
    title:"",
    description:"",
    body:"", // body 文章body
    tags:["css","html"],
    tag:'js',
    errors:null,
}
const userReduer = (state=initState,action)=>{

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
           const filterTags =  state.tags.filter(tag=>tag!==removeTag)
            return {...state,tags:filterTags}
        case constant.ARTICLE_CREATE_RESULT: // 创建文章结果 ： 错误
            return {...state,errors:{message:action.result.message}}
        default:
            break;
    }

    return state
}

export default userReduer