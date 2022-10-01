//user控制器
const HttpException = require("../exception/httpException");
const {validateCreateUser} = require("../utils/validate/user.validate")
const createUser = (req,res,next)=>{
    try {
        let {username,password,email} = req.body.user;
        console.log(username,password,email,"-----------");
        let {error,validate} = validateCreateUser(username,password,email);
        if(!validate){
            throw new HttpException(401,"用户数据验证失败",error)
        }
        console.log(error,validate);
    } catch (error) {
        next(error)
    }
}
module.exports = createUser