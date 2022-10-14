const HttpException = require("../exception/httpException");
const User = require("../model/user")
//添加关注
const followController =async (req,res,next)=>{
    try {
      // console.log(req.user,"req");
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
        following:true
      }
      res.status(200)
         .json({
            data:beConcerned,
            messsage:"关注成功",
            status:1
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
        following:false
      }
      res.status(200)
         .json({
            data:beConcerned,
            messsage:"取关成功",
            status:1
         })
}
//判断当前登录的用户是否关注了该作者
const getFollowers = async (req,res,next)=>{
  //场景：查看作者主页中的粉丝
    try {
      const username = req.params.username;
      //查看该作者是否在关联表中
      const userAuthor = await User.findOne({
        where:{
          username
        },
        include:['followors'] //通过followors中间表查询user1,user2
      })
      console.log(userAuthor,"userAuthor");
      if(!userAuthor){
        throw new HttpException(404,"作者的用户名不存在","user with this username not found")
      }

      const {email} = req.user;
      let following = false;
      let followers = []
      for(const user of userAuthor.followors){
        if(email===user.dataValues.followors){
          following=true;
        }
        delete user.dataValues.password;
        delete user.dataValues.Followers;
        followers.push(user.dataValues)
      }

      const profile ={
        username:userAuthor.username,
        bio:userAuthor.bio,
        avatar:userAuthor.avatar,
        following,
        followers
      }
      res.status(200)
      .json({
        status:1,
        messsage:'获取成功',
        data:profile
      })
    } catch (error) {
      next(error)
    }
}
module.exports = {followController,cancelController,getFollowers}