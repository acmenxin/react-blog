import apiClient from "./apiClient";

export default{
    regist:(email,username,password)=>apiClient.post("/users",{user:{email,username,password}}),
    login:(email,password)=>apiClient.post("/users/login",{user:{email,password}}),
    get:(username)=>apiClient.get("/users/"+username),
    update:(user)=>apiClient.put("/users",{user}),
}