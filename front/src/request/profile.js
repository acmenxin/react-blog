import apiClient from "./apiClient"
export default{
    get:(username)=>apiClient.get('/follows/'+username) //获取用户信息
}