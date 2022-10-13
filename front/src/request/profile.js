import apiClient from "./apiClient"

export default{
    get:(username)=>apiClient.get('/follow/'+username)
}