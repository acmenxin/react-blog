import * as constant from "../../constant"
const iniState ={
    username:'',
    bio:'',
    avatar:null,
    following:false,
    followers:[],
    errors:null,
}
const profileReducer = (state=iniState,action)=>{
    switch (action.type) {
        case constant.PROFILE_GET_RESULT:
            console.log(action.result,"action.result");
            if(action.result.status===1){ //根据后端返回数据写结果
             return   {...state,...action.result.data}
            }else{
                return {...state,errors:{message:action.result.message}}
            }
        default:
            break;
    }
    return state;
}

export default profileReducer