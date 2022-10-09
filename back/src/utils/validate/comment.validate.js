const validator = require("validator")
// 用户注册---数据校验
const validateCreateComment = (comment)=>{
    let error={}
    if(validator.isEmpty(comment)){
        error.comment="comment"
    }
    let validate = Object.keys(error).length<1//true验证通过
    return {error,validate}
}

module.exports = validateCreateComment