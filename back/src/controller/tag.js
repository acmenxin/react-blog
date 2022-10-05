const HttpException = require("../exception/httpException");
const validateCreateTag = require("../utils/validate/tag.validate")
const Tag = require("../model/tag")

//创建标签
const createTag = async(req,res,next)=>{
    try {
        const tag = req.body.tag;
        if(!tag){
            throw new HttpException(401,"tag必须传递","tag is not found")
        }
        const {error,validate} = validateCreateTag(tag);
        if(!validate){
            throw new HttpException(401,"tag数据验证失败",error)
        }
        const result = await Tag.create({name:tag})
        console.log(result);
        return res.status(200)
                  .json({
                    status:1,
                    message:"创建标签成功",
                    data:result.name
                  })
    } catch (error) {
        next(error)
    }
}
//获取所有标签
const getTags = async(req,res,next)=>{
    try {
        const tagAll = await Tag.findAll()
        const tags = []
        if(tagAll.length>0){
            for(let tag of tagAll){
                tags.push(tag.name)
            }
        }
        return res.status(200)
                .json({
                    status:1,
                    message:"创建标签成功",
                    data:tags
                })
    } catch (error) {
        next(error)
    }
}
//删除某个标签
const destoryTag = async(req,res,next)=>{
    try {
         const tag = req.params.tag;
    const destorytag = await Tag.destroy({
        where:{
            name:tag
        }
    });
    return res.status(200)
              .json({
                status:1,
                message:"删除标签成功"
              })
    } catch (error) {
        next(error)
    }
   
}
module.exports = {createTag,getTags,destoryTag}