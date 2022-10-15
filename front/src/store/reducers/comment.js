import * as constant from '../../constant'
const initState={
    body:"", 
    errors:null,
    comments:[]
}
const commentReduer = (state=initState,action)=>{
    switch (action.type) {
        case constant.COMMENT_UPDATE_FIELD:  //同步输入评论
            const key  = action.key
            const value  = action.value
            return {...state,[key]:value}
        case constant.COMMENT_CREATE_RESULT:  //创建评论结果
            if(action.result.status===1){
                const comment = action.result.data
                return {...state,body:'',comments:state.comments.concat([comment])}
            }else{
                return {...state,body:'',errors:{message:action.result.message}}
            }
        case constant.COMMENT_DELETE_RESULT:  //删除评论结果
            if(action.result.status===1){
                const commentId =  action.result.id
                return {...state,body:'',comments:state.comments.filter(comment=>{
                    return comment.id!=commentId
                })}
            }else{
                return {...state,body:'',errors:{message:action.result.message}}
            }
        case constant.COMMENTS_GET_RESULT: 
            if(action.result.status===1){
                const comments = action.result.data
                return {...state,body:'',comments}
            }else{
                return {...state,body:'',errors:{message:action.result.message}}
            }
        default:
            break;
    }
    return state
}

export default commentReduer