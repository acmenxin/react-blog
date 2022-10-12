import * as constant from "../../constant"
//reducer纯函数
const iniState={
    //初始化数据
    email:'xxx@163.com',
    username:'',
    password:'',
    errors:null
}
const userReducer = (state=iniState,action)=>{
    switch (action.type) {
        case constant.USER_UNLOAD:
            return {...iniState}
        case constant.USER_REGIST:
           const {key,value} = action
        //    console.log(key,value,"key:value");
           return {...state,[key]:value}
        case constant.USER_REGIST_RESULT: //注册
           return {...state,errors:action.result} 
        default:
            break;
    }
    return state;
}
export default userReducer