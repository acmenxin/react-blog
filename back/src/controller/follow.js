const HttpException = require("../exception/httpException");
const User = require("../model/user")
//添加关注
const followController =async (req,res,next)=>{
    try {
      console.log(req.user,"req");//打印不出来？
      const username = req.params.username;
      const userA = await User.findOne({
        where:{
            username //登录状态无法确定，应该是模糊的查找
        }
      })
      if(!userA){
        throw new HttpException(401,"被关注者不存在","userA is not defined")
      }
      const {email} = req.user;
      const userB = await User.findByPk(email)//应该是已登录状态
      if(!userB){
        throw new HttpException(401,"关注者不存在","userB is not defined")
      }
      //添加关注行为：关注者（粉丝）给被关注者（作者）添加的主动行为
      console.log(userA.__proto__,"__Proto__");
      await userA.addFollowor(userB) //被关注者去主动添加
      //返回被关注者的信息
      const beConcerned = {
        username:userA.username,
        email:userA.email,
        bio:userA.bio,
        follow:true
      }
      res.status(200)
         .json({
            data:beConcerned,
            messsage:"关注成功"
         })
    } catch (error) {
        next(error)
    }
}
//取消关注
const cancelController = async(req,res,next)=>{
    const username = req.params.username
    const userA = await User.findOne({
        where:{
            username //登录状态无法确定，应该是模糊的查找
        }
      })
      if(!userA){
        throw new HttpException(401,"被关注者不存在","userA is not defined")
      }
      const {email} = req.user;
      const userB = await User.findByPk(email)//应该是已登录状态
      if(!userB){
        throw new HttpException(401,"关注者不存在","userB is not defined")
      }
      await userA.removeFollowor(userB)
      const beConcerned = {
        username:userA.username,
        email:userA.email,
        bio:userA.bio,
        follow:false
      }
      res.status(200)
         .json({
            data:beConcerned,
            messsage:"取关成功"
         })
}
module.exports = {followController,cancelController}