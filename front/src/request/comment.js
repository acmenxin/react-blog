import apiClient from "./apiClient";
// comment业务请求封装
export default {
    create:(slug,body)=>apiClient.post(`/comments/${slug}`,{body}), //创建评论
    get:slug=>apiClient.get(`/comments/${slug}`), //获取文章的评论
    delete:(slug,id)=>apiClient.delete(`/comments/${slug}/${id}`), //删除该文章下的某一条评论
}
