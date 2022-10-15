import * as constant from "../../constant"
import { savaData,deleteData } from "../../utils/localstorage"
//reducer纯函数
const iniState={
    //初始化数据
    email:'xxx@163.com',
    username:'',
    password:'',
    bio:'',
    avatar:'',
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
        case constant.USER_REGIST_RESULT: //注册成功结果
           return {...state,errors:action.result} 
        case constant.USER_LOGIN_RESULT: //登陆成功结果
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
                return {...state,
                    email:currentUser.email,
                    username:currentUser.username,
                    avatar:currentUser.avatar,
                    bio:currentUser.bio,
                    currentUser,
                    token,
                    errors:null,
                    redirect:"/"}
                
            }else{
                const {errors} = action.result
                return {...state,errors}
            }
        case constant.USER_SYNC_RESULT:  // localstorage只要有登录信息，就一直维护登陆状态
            const currentUser = action.result;
            console.log("初始状态更新");
            return {...state,currentUser,...currentUser}
        case constant.USER_UPDATE_RESULT: //更新用户信息
            if(action.result.status===1){
                // console.log("data",action.result.data);
              // 更新后用户信息 也要同步仓库 store
              state.currentUser = action.result.data
              //  更新后用户信息 同步本地 localstorage
              savaData("currentUser",action.result.data)
              savaData("token",action.result.data.token)
              return {...state,...action.result.data}
            }else{
              return {...state,errors:action.result.message}
            }
        case constant.USER_SETTING_LOGOUT: //退出
            //清除 currentUser & token
            // 内存信息 清除
            state = iniState
            // localstorage 清除
            deleteData('currentUser')
            deleteData('token')
            return {...state,redirect:'/login'}
        default:
            break;
    }
    return state;
}
export default userReducer