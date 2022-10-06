const HttpException = require("../exception/httpException");
const validateCreateArticle = require("../utils/validate/article.validate")
const User = require("../model/user")
const randomSlug = require("../utils/slug")
const Article = require("../model/artical")
const Tag = require("../model/Tag")
const createArticle = async(req,res,next)=>{
    try {
        //在路由的时候就登录验证token,然后才能使用该控制器
        //使用控制器开始：获取前端传来的body数据
        const {title,description,body,tags} = req.body.article;
        //数据验证：
        let {error,validate} = validateCreateArticle(title,description,body)
        if(!validate){
            throw new HttpException(401,"数据提交有误","title,description,body不能为空")
        }
        //业务校验 :作者信息是否存在
        const {email} = req.user;
        const author = await User.findByPk(email);
        if(!author){
            throw new HttpException(401,"作者账号不存在","author is not found")
        }
        //开始创建文章：首先要生成唯一的别名slug
        let slug = randomSlug()
        let article = await Article.create({
            slug,
            title,
            description,
            body,
            UserEmail:email
        })
        // console.log(article,"article");

        //遍历文章的每一个标签：只存贮新的标签，存储之间关系
        if(tags.length>0){
            //遍历每一个标签
            for (const tag of tags) {
                let existTag = await Tag.findByPk(tag)
                if(!existTag){ //如果不存在
                    //存储标签
                   let newTag = await Tag.create({
                        name:tag
                    })
                    //存储新标签和文章的关系
                   await article.addTag(newTag)
                }else{ //老标签
                   await article.addTag(existTag)
                }
            }
        }

        //返回文章数据（文章/标签/作者）
        // 根据唯一标识slug获取该文章（包含文章对应的标签）
        article = await Article.findByPk(slug,{include:Tag})
        // console.log(article.dataValues.Tags,"article");
        //先将返回的标签优化
        const newTags = []
        for(const tag of article.dataValues.Tags){
            newTags.push(tag.dataValues.name)
        }
        article.dataValues.tags= newTags;
        // console.log(article.dataValues.tags,"tags");
        //作者信息优化
        delete author.dataValues.password;
        delete author.dataValues.email;
        delete article.dataValues.Tags;
        article.dataValues.author = author
        res.status(201)
           .json({
            status:1,
            message:"文章创建成功",
            data:article.dataValues
           })
    } catch (error) {
        next(error)
    }
}
module.exports={createArticle}