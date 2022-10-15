const HttpException = require("../exception/httpException");
const validateCreateArticle = require("../utils/validate/article.validate")
const User = require("../model/user")
const randomSlug = require("../utils/slug")
const Article = require("../model/artical")
const Tag = require("../model/Tag");
const sequelize = require("../db/sequelize");
//封装喜欢信息
const  getFavorite =  async (article,currentUser)=>{
       
    // 喜欢数量
       const favoriteCount  = await article.countUsers() //获取喜欢文章人数量
        
       // 当前登录用户是否喜欢
        const favoriteUsers  = await article.getUsers() //获取喜欢文章人 
        let allFavoriteEmail  = []
        for (const user of favoriteUsers) {
           allFavoriteEmail.push(user.email)
        }
        
        let favorited = false; //默认 没登陆 都显示未喜欢 ； 
        if(currentUser){ //登录了则判断是否喜欢
            let loginEmail =currentUser.email
            favorited = allFavoriteEmail.includes(loginEmail)
        }

        return {favoriteCount,favorited}
}
//创建文章
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
        // console.log(article.__proto__,"__proto__");
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
        // 根据唯一标识slug获取该文章（包含返回文章对应的标签）
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
//获取文章
const getArticle = async(req,res,next)=>{
    try {
        //01获取数据
        const slug = req.params.slug;
        //02数据校验
        let article = await Article.findByPk(slug)
        if(!article){
            throw new HttpException(401,"文章不存在","article not found")
        }
        //03获取文章、标签、作者信息
        // console.log(article,"article1");
        //同时获取文章关联的标签  使用include关联查询
        article = await Article.findByPk(slug,{include:Tag})
        // console.log(article,"article2");
        //处理tags,变成数组的样式展示
        const tags = []
        for(const tag of article.dataValues.Tags){
            tags.push(tag.name)
        }
        article.dataValues.tags = tags

        //获取文章作者
        let  author = await article.getUser()
        //喜欢信息，喜欢数量---
        const countFavoriteUsers = await article.countUsers()
        const favoriteUsers = await article.getUsers()
        // console.log(favoriteUsers,"favoriteUsers");
        let allFavoriteEmail = []
        for (const user of favoriteUsers) {
            allFavoriteEmail.push(user.email)
        }
        let isFavorite = false;
        if(req.user){
            let loginEmail = req.user.email;
            isFavorite = allFavoriteEmail.includes(loginEmail)
        }
        
        article.dataValues.author=author
        //处理作者隐私信息
        delete article.dataValues.Tags;
        delete author.dataValues.password;
        delete article.dataValues.UserEmail;
        article.dataValues.favoriteCount = countFavoriteUsers; //喜欢数量
        article.dataValues.favorited = isFavorite;//是否喜欢
        //04返回数据
        return res.status(200)
                .json({
                    message:"获取文章信息成功",
                    data:article.dataValues
                })
    } catch (error) {
        next(error)
    }
}
//更新文章
const updataArticle = async(req,res,next)=>{
    try {
        //01 获取参数
        const slug = req.params.slug;
        //判断文章是否存在
        let article = await Article.findByPk(slug)
        if(!article){
            throw new HttpException(401,"文章不存在","article not found")
        }
        //判断是否是作者本人修改文章
        let authorEmail = article.UserEmail;
        let loginEmail = req.user.email;
        if(authorEmail!==loginEmail){
            throw new HttpException(401,"只有作者账号才能修改文章","only author can update the article")
        }
        //02 获取带标签的文章
        article = await Article.findByPk(slug,{include:Tag})
        // console.log(article,"article");
        //03 获取文章的更新内容（body中）
        const {title,description,body,tags} = req.body.article;
        //04 更新原article操作
        const updateArticle = await article.update({title,description,body})
        //05 获取作者信息
        const {email} = req.user;
        const author = await User.findByPk(email);
        //06 数据处理---更新数据
        let newtags = []
         for(let tag of tags){
            newtags.push(tag)
        }
          //遍历更新时文章的每一个标签：只存贮新的标签，存储之间关系
          if(newtags.length>0){
            //遍历每一个标签
            for (const tag of newtags) {
                let existTag = await Tag.findByPk(tag)
                if(!existTag){ //如果不存在
                    //存储标签
                   let newTag = await Tag.create({
                        name:tag
                    })
                    console.log(newTag,"newTag");
                    //存储新标签和文章的关系
                   await updateArticle.addTag(newTag)
                }else{ //老标签
                   await updateArticle.addTag(existTag)
                }
            }
        }
        updateArticle.dataValues.tags = newtags
        delete updateArticle.dataValues.Tags;
        delete author.dataValues.password;
        delete updateArticle.dataValues.UserEmail
        return res.status(200)
        .json({
            message:"更新成功",
            data:updateArticle.dataValues
        })
    } catch (error) {
        next(error)
    }
}
//删除文章
const destoryArticle = async(req,res,next)=>{
    try {
    //01获取参数slug
    const slug = req.params.slug;
    //02验证文章是否存在
    let article = await Article.findByPk(slug)
    if(!article){
        throw new HttpException(401,"文章不存在","article not found")
    }
    //03验证用户权限（只有作者能删除）
    let authorEmail = article.UserEmail;
    let loginEmail = req.user.email;
    if(authorEmail!==loginEmail){
        throw new HttpException(401,"只有作者账号才能删除文章","only author can update the article")
    }
    //04删除文章
    const destoryslug = await Article.destroy({
       where:{
          slug
       }
   });
   //05返回数据
   return res.status(200)
             .json({
               status:1,
               message:"删除文章成功",
               data:article
             })
   } catch (error) {
       next(error)
   }  
}

function handleArticle2(article,favoriteCount,favorited){
    //处理tag
    const tags = []
    for (const tag of article.dataValues.Tags) {
        // console.log(tag.name);
        tags.push(tag.name)
    }
    article.dataValues.tags = tags
    
    //处理author
    let author = article.dataValues.user
    delete author.dataValues.password  //删除作者password 
    delete article.dataValues.userEmail //删除文章userEmail
    delete article.dataValues.user // 删除user
    article.dataValues.author = author //追加处理好作者信息

    //处理喜欢
    article.dataValues.favoriteCount = favoriteCount //喜欢数量
    article.dataValues.favorited = favorited //是否喜欢
    
    return article.dataValues
}
//获取关注作者们的文章
const getFollowerArticle = async(req,res,next)=>{
    try {
        //获取粉丝email = 就是登录用户 
        const fansEmail  = req.user.email //当前登录用户的email
        //获取登录用户的关注的作者 ： follows 中间表
        const query = `SELECT userEmail FROM followers WHERE followerEmail ="${fansEmail}"`
        const followAuthors  = await sequelize.query(query)

        //没有关注的作者 => 文章就是空数组[]
        if(followAuthors[0].length==0){
            return res.status(200)
                .json({
                    status:1,
                    message:'获取关注文章成功',
                    data:[]  //客户端不显示文章列表 会显示提示
                })
        }
        //有有关注的作者 => 获取所有作者email [emial1,email...]
        //遍历email 获取作者email数组
        let followAtuhorEmails = []
        for (const item of followAuthors[0]) {
            followAtuhorEmails.push(item.userEmail)
        }

        // 思路 => 作者们的[email1,email2..]
        // 获取每一个作者 的所有文章 （注意：每一篇文章都要有 标签和作者信息）
        let {count,rows}  = await Article.findAndCountAll({
            distinct:true, // 去重 =>精确数据
            where:{
                userEmail:followAtuhorEmails //可以直接等于一个数组
            },
            include:[Tag,User]
        })
        //处理每个一作者的每一个篇文章都要处理：标签和作者信息 
        const articles = []
        for (const t of rows) {
            const {favoriteCount,favorited} = await getFavorite(t,req.user)
            let handleArticle  = handleArticle2(t,favoriteCount,favorited)
            articles.push(handleArticle)
        }

        // console.log(articles);s

        //响应数据
        return res.status(200)
        .json({
            status:1,
            message:'获取关注文章成功',
            data:{articles,count}
        })
    } catch (error) {
        next(error)
    }
}
//获取多个文章，全局查询：author,tag,limit,offset
const getArticles = async(req,res,next)=>{
    try {
        const email = req.user?req.user.email:null
        // 获取 author / tag / limit / offset   <=req.query
        const {favorite,tag,author,limit=10,offset=0}  = req.query
        let result ;
        if(tag&&!author&&!favorite){ //标签过滤文章
            result = await Article.findAndCountAll({
                distinct:true,
                include:[
                    {model:Tag,attributes:['name'],where:{name:tag}},
                    {model:User,attributes:['email','username','bio','avatar']}
                ],
                limit:parseInt(limit), //参数 都是字符串=>转化int
                offset:parseInt(offset)
            }) //批量查询
        }
        
        if(author&&!tag&&!favorite){  //获取作者自己文章
            result = await Article.findAndCountAll({
                distinct:true,
                include:[
                    {model:Tag,attributes:['name']},
                    {model:User,attributes:['email','username','bio','avatar'],where:{username:author}}
                ],
                limit:parseInt(limit), 
                offset:parseInt(offset)
            }) 

        }
        
        if(tag&&author&&!favorite){//作者&标签
            result = await Article.findAndCountAll({
                distinct:true,
                include:[
                    {model:Tag,attributes:['name'],where:{name:tag}},
                    {model:User,attributes:['email','username','bio','avatar'],where:{username:author}}
                ],
                limit:parseInt(limit), 
                offset:parseInt(offset)
            }) 

        }
        
        //favorite = 作者，favorite标记 代表查询 作者 喜欢的文章
        if(favorite&&!tag&&!author){//获取作者喜欢的文章
            const authorName = favorite
            const author = await User.findOne({
                where:{username:authorName}
            })
            const authorEmail = author.email
            const queryString = `SELECT articleSlug from favorites WHERE userEmail = "${authorEmail}"`
            const queryResult = await sequelize.query(queryString)
            console.log(queryResult)
            if(queryResult[0].length===0){
                return res.status(200)
                          .json({
                            status:1,
                            message:'没有喜欢的文章',
                            data:[]
                          })
            }

            let artcileSlugs = []
            for (const item of queryResult[0]) {
                artcileSlugs.push(item.articleSlug)
            }

            result =  await Article.findAndCountAll({
                distinct:true,
                where:{
                    slug:artcileSlugs
                },
                include:[Tag,User],
            })
            console.log(result)
        }        
        if(!tag&&!author&&!favorite){ //全局查询文章
            result = await Article.findAndCountAll({
                distinct:true,
                include:[
                    {model:Tag,attributes:['name']},
                    {model:User,attributes:['email','username','bio','avatar']}
                ],
                limit:parseInt(limit), 
                offset:parseInt(offset)
            }) 
        }
        const {count,rows} = result
        //count 总数 /  limit 一页数据  = 页码数据
        // rows 文章需要处理
        const articles = []
        for (const t of rows) {
            const {favoriteCount,favorited} = await getFavorite(t,req.user)
            let handleArticle  = handleArticle2(t,favoriteCount,favorited)
            articles.push(handleArticle)
        }
        return res.status(200)
                  .json({
                    status:1,
                    message:'获取筛选文章成功',
                    data:{articles,count}
                  })
    } catch (error) {
        next(error)
    }
}
module.exports={createArticle,getArticle,updataArticle,destoryArticle,getFollowerArticle,getArticles}