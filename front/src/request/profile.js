import apiClient from "./apiClient"
export default{
    get:(username)=>apiClient.get('/follows/'+username) ,//获取用户信息
    post:(username)=>apiClient.post("/follows/"+username), //关注
    delete:(username)=>apiClient.delete("/follows/"+username)//取关
}