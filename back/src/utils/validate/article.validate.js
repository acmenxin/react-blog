const validator = require("validator")
// 用户注册---数据校验
const validateCreateArticle = (title,description,body)=>{
    console.log("----------");
    let error={}
    if(validator.isEmpty(title)){
        error.username="title不能为空"
    }
    if(validator.isEmpty(description)){
        error.password="description不能为空"
    }
    if(validator.isEmpty(body)){
        error.email="body不能为空"
    }
    let validate = Object.keys(error).length<1//true验证通过
    return {error,validate}
}

module.exports = validateCreateArticle