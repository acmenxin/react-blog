const HttpException = require("../exception/httpException");
const validateCreateArticle = require("../utils/validate/article.validate")
const User = require("../model/user")
const randomSlug = require("../utils/slug")
const Article = require("../model/artical")
const Tag = require("../model/Tag");
const sequelize = require("../db/sequelize");
//添加喜欢
function handleArticle1(article,author,count){
    const newTags = []
    for (const item of article.dataValues.Tags) {
        newTags.push(item.name)
    }
    article.dataValues.tags = newTags;

    delete author.dataValues.password;
    delete author.dataValues.email;
    delete article.dataValues.Tags;
    delete article.dataValues.UserEmail;
    article.dataValues.author=author;
    article.dataValues.favoriteCount = count;
    article.dataValues.favorited = true;
    return article.dataValues;
}
const addFavorite = async(req,res,next)=>{
    try {
        //获取参数
        const slug = req.params.slug;
        //获取文章
        let article = await Article.findByPk(slug,{include:Tag})
        if(!article){
            throw new HttpException(401,"喜欢的文章不存在","favorite not found")
        }
        //添加喜欢： “文章” 添加 “喜欢的用户们”
        await article.addUsers(req.user.email);
        //获取喜欢的作者，获取喜欢的个数
        const author = await article.getUser()
        const count = await article.countUsers()
        article = handleArticle1(article,author,count)

        return res.status(200).json({
            status:1,
            message:"喜欢文章成功",
            data:article
        })
    } catch (error) {
        next(error)
    }
}
//取消喜欢
function handleArticle2(article,author,count){
    const newTags = []
    for (const item of article.dataValues.Tags) {
        newTags.push(item.name)
    }
    article.dataValues.tags = newTags;

    delete author.dataValues.password;
    delete author.dataValues.email;
    delete article.dataValues.Tags;
    delete article.dataValues.UserEmail;
    article.dataValues.author=author;
    article.dataValues.favoriteCount = count;
    article.dataValues.favorited = false;
    return article.dataValues;
}
const removeFavorite = async(req,res,next)=>{
    try {
        const slug = req.params.slug;
        let article = await Article.findByPk(slug,{include:Tag})
        if(!article){
            throw new HttpException(404,"喜欢文章不存在","article not found")
        }
        await article.removeUsers(req.user.email)
        const author = await article.getUser()
        const count = await article.countUsers()
        article = handleArticle2(article,author,count)
        return res.status(200).json({
            status:1,
            message:"取消喜欢文章成功",
            data:article
        })
    } catch (error) {
        next(error)
    }
}
module.exports={addFavorite,removeFavorite}