//reducer纯函数
const iniState={
    //初始化数据
    username:'guojiaxin',
    password:'guojiaxin123',
    email:'guojiaxin@163.com'
}
const userReducer = (state=iniState,action)=>{
    return state;
}
export default userReducer