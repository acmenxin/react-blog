const validator = require("validator")
// 用户注册---数据校验
const validateCreateTag = (tag)=>{
    let error={}
    if(validator.isEmpty(tag)){
        error.tag="tag"
    }
    let validate = Object.keys(error).length<1//true验证通过
    return {error,validate}
}

module.exports = validateCreateTag