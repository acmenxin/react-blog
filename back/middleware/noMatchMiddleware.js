const HttpException = require("../exception/httpException")
//当404的时候，就去调用类组件，将404的信息new一个实例对象
const noMatchMiddleware =(req,res,next)=>{
   const noMatchError = new HttpException(404,"访问路径不匹配","router url not found")
   //调用next
   next(noMatchError)
}

module.exports = noMatchMiddleware