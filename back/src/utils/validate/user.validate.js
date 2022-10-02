const validator = require("validator")
// 用户注册---数据校验
const validateCreateUser = (username,password,email)=>{
    console.log("----------");
    let error={}
    if(validator.isEmpty(username)){
        error.username="username不能为空"
    }
    if(validator.isEmpty(password)){
        error.password="password不能为空"
    }
    if(validator.isEmpty(email)){
        error.email="email不能为空"
    }
    if(!validator.isEmpty(email)&&!validator.isEmail(email)){
        error.email="email格式不对"
    }
    let validate = Object.keys(error).length<1//true验证通过
    return {error,validate}
}
//用户登录---数据校验
const validateLoginUser = (email,password)=>{
    let error ={}
    if(validator.isEmpty(password)){
        error.password="password不能为空"
    }
    if(validator.isEmpty(email)){
        error.email="email不能为空"
    }
    if(!validator.isEmpty(email)&&!validator.isEmail(email)){
        error.email="email格式不对"
    }
    let validate = Object.keys(error).length<1//true验证通过
    return {error,validate}
}
module.exports = {validateCreateUser,validateLoginUser}