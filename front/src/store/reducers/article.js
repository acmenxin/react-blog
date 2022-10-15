//reducer纯函数
import * as constant from "../../constant"
const iniState={
    //初始化数据
    articles:[],
    tag:[],
    count:0
}
const articleReducer = (state=iniState,action)=>{
    switch (action.type) {
        case constant.ARTICLES_AUTHOR_RESULT: //获取作者本人的文章
            if(action.result.status===1){
                const {articles,count} = action.result.data;
                return {...state,articles,count}
            }else{
                return {...state,errors:action.result.message}
            }
        default:
            break;
    }
    return state;
}
export default articleReducer