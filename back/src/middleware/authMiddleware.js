const HttpException = require("../exception/httpException");
const {sign,decode} = require("../utils/jwt")
const authMiddleware =async (req,res,next)=>{
    console.log(req.headers.authorization);
    //01 加签，获得token
    // const jwtSign =await sign("username","email")
    //02解签，用key
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return next(new HttpException(401,"authHeader必须提供","authHeader is missing"))
    }
    //如果存在，则验证token类型
    const authHeaderArr = authHeader.split(" "); //分割成数组
    if(authHeaderArr[0]!=="Token"){
        return next(new HttpException(401,"格式错误，authorization格式：Token content","authorization"))
    }
    if(!authHeaderArr[1]){
        return next(new  HttpException(401,"格式错误，authorization格式：Token content","authorization"))
    }
    //Token全部验证成功 
    try {
        const token = authHeaderArr[1]
        const user = await decode(token) //解签
        if(!user){
            return next(new HttpException(401,"token内容不存在","token decode error"))
        }
        req.user = user; //返回给req，方便后面调用
        req.token = token;
        return next() //03 解签成功
    } catch (error) { 
        //04 解签失败 token过期/失效
        return next(new HttpException(401,"Authorization token验证失败","token decode error"))
    }
    // const token = await decode(jwtSign)
    // console.log(token);
   
}
module.exports = authMiddleware