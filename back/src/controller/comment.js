const HttpException = require("../exception/httpException");
const validateCreateComment = require("../utils/validate/comment.validate")
const User = require("../model/user")
const Article = require("../model/artical")
const Comment = require("../model/Comment");
//创建评论
const addComment = async(req,res,next)=>{
    try {
        //获取文章slug
        const slug = req.params.slug
        //验证是否为登录用户
        const {email} = req.user;
        const user = await User.findByPk(email)
        if(!user){
            throw new HttpException(401,"请先登录","please login")
        }
        //验证文章是否存在
        let article = await Article.findByPk(slug);
        if(!article){
            throw new HttpException(401,"文章不存在","article not found")
        }
        //获取评论内容
        const {body} = req.body.comment
        //验证评论规范
        let {error,validate} = validateCreateComment(body)
        if(!validate){
            throw new HttpException(401,"评论不允许为空","comment is not empty")
        }
        //创建评论至数据库
        let newComment  = await Comment.create({body})
        // console.log(newComment);
        // console.log(user.__proto__,"__proto__")
        //创建用户和评论的关系
        await user.addComments(newComment)
        // //创建文章和评论的关系
        await article.addComments(newComment)
        // console.log("addCommit");
        newComment.dataValues.author={
            username:user.username,
            avatar:user.avatar,
            bio:user.bio
        }
        return res.status(200).json({
            status:1,
            message:"创建评论成功",
            data:newComment
        })
    } catch (error) {
        next(error)
    }
}
//获取评论列表
const getComments = async(req,res,next)=>{
    try {
        const slug = req.params.slug;
        const article = await Article.findByPk(slug)
        if(!article){
            throw new HttpException(404,"评论的文章不存在","comment article not found")
        }

        //获取评论： 要和文章/信息关联
        const comments = await Comment.findAll({
            where:{
                articalSlug:slug
            },
            include:[
                {
                    model:User,
                    attributes:["username","avatar","bio"]
                }
            ]
        })
        // console.log(comments);
        return res.status(200).json({
            statu:1,
            message:"获取评论成功",
            data:comments
        })
    } catch (error) {
        next(error)
    }
}
//删除评论
const deleteComment = async (req,res,next)=>{
    try {
        //获取文章slug   获取评论id
        const {slug,id} = req.params;
        console.log(slug,id);
        //验证文章/评论是否存在
        const article = await Article.findByPk(slug)
        if(!article){
            throw new HttpException(401,"文章不存在","article not found")
        }
        const comment = await Comment.findByPk(id)
        if(!comment){
            throw new HttpException(401,"评论不存在","comment not found")
        }
        //谁评论的谁可以删
        const userEmail = req.user.email;
        const commentEmail = comment.UserEmail
        if(userEmail!==commentEmail){
            throw new HttpException(401,"当前用户没有删除权限","only author could delete comments")
        }
        //      删除这个评论
        await comment.destroy()
        // 响应数据
        return res.status(200).json({
            status:1,
            message:"删除评论成功"
        })
    } catch (error) {
        next(error)
    }
}
module.exports={addComment,getComments,deleteComment}