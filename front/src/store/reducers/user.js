import * as constant from "../../constant"
import { savaData } from "../../utils/localstorage"
//reducer纯函数
const iniState={
    //初始化数据
    email:'xxx@163.com',
    username:'',
    password:'',
    errors:null,
    currentUser:null,
    token:null,
    redirect:''
}
const userReducer = (state=iniState,action)=>{
    switch (action.type) {
        case constant.USER_UNLOAD:
            return {...iniState}
        case constant.USER_REGIST:
           const {key,value} = action
           return {...state,[key]:value}
        case constant.USER_REGIST_RESULT: //注册
           return {...state,errors:action.result} 
        case constant.USER_LOGIN_RESULT:
            const {status,message,data} = action.result
            if(status===1){ //登陆成功
                let token = null;
                let currentUser = null;
                //解决token：用来后续访问接口
                //currentUser用户信息进行存储（判断前端是否登录）
                token=data.token
                currentUser= data
                //两者同步到本地，例如存放在本地多久还可以直接登录，同步到localStorage中持久化
                savaData("currentUser",currentUser)
                savaData("token",token)
                //返回state //重定向标记
                return {...state,currentUser,token,errors:null,redirect:"/"}
                
            }else{
                const {errors} = action.result
                return {...state,errors}
            }
        default:
            break;
    }
    return state;
}
export default userReducer