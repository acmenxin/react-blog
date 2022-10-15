import apiClient from "./apiClient"
export default{
    //一个文章
    get:slug=>apiClient.get(`/articles/${slug}`) ,//获取文章
    create:(article)=>apiClient.post("/articles",{article}), //创建
    update:(article)=>apiClient.put("/articles/"+article.slug,{article}), //改
    delete:(slug)=>apiClient.delete("/articles/"+slug),//删除文章

    favorite:slug=>apiClient.post(`/favorites/${slug}`),
    unfavorite:slug=>apiClient.delete(`/favorites/${slug}`),

    //文章列表 + 分页
    getAuthor:(author,page)=>apiClient.get(`/articles?author=${author}&limit=${5}&offset=${page?(page-1)*5:0}`),
    
}