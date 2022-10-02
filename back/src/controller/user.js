//user控制器
const HttpException = require("../exception/httpException");
const {validateCreateUser,validateLoginUser} = require("../utils/validate/user.validate")
const {md5Password,matchPWD} = require("../utils/md5")
const User = require("../model/user")
const {sign} = require("../utils/jwt")
//用户注册
const createUser = async (req,res,next)=>{
        try {
        //1获取提交内容
        let {username,password,email} = req.body.user;
        // 2进行数据校验
         let {error,validate} = validateCreateUser(username,password,email);
        // 3总的数据验证
        if(!validate){
            throw new HttpException(401,"用户数据验证失败",error)
        }
        //4业务验证
        //4.1.验证email是否存在
        const existUser = await User.findByPk(email) //所有数据库查询都为异步
        if(existUser){
            throw new HttpException(401,"用户邮箱已存在","email has exist")
        }
        const existUsername = await User.findOne({username:username});
        if(existUsername){
            throw new HttpException(401,"用户名称已存在","username has exist")
        }
        //5创建用户
        //5.1密码加密
        const md5PWD = await md5Password(password)
        //5.2 存储进数据库
        const user = await User.create({
            username,
            password:md5PWD,
            email
        })
        //5.3.1响应数据处理
        let data = {}
        data.username=username;
        data.email=email
        //5.3成功=>res
        
            console.log(user,"user");
            res.json({
               data
            })
        
        } catch (error) {
             next(error)
        }
}
//用户登录
const loginUser = async(req,res,next)=>{
    try {
      //拿到数据
      let {email,password} = req.body.user;
      //数据校验
      let {error,validate} = validateLoginUser(email,password)
      if(!validate){
        throw new HttpException(401,"用户数据校验失败",error)
      }
      //业务数据校验
      const user = await User.findByPk(email) //拿到整条数据
      //拿到数据库中存储的密码和登录密码进行匹配
      let DbPassword = user.dataValues.password
      const isMatch =await matchPWD(DbPassword,password)
      if(!isMatch){
        throw new HttpException(401,"用户密码输入错误","password is not matched")
      }
       delete user.dataValues.password; //删掉password这个敏感信息
       user.dataValues.token = await sign(user.dataValues.username,user.dataValues.email)//加上token
       return res.json({
        data:user.dataValues
       })
    } catch (error) {
        next(error)
    }
   
}
module.exports={createUser,loginUser}