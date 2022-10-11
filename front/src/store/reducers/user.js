import * as constant from "../../constant"
//reducer纯函数
const iniState={
    //初始化数据
    email:'666@qq.com',
    username:'111',
    password:'123456',
}
const userReducer = (state=iniState,action)=>{
    console.log(action,"action3");
    switch (action.type) {
        case constant.USER_REGIST:
           const {key,value} = action
           console.log(key,value,"key:value");
           return {...state,[key]:value}
        default:
            break;
    }
    return state;
}
export default userReducer