// 请求地址 restful 
const baseURL = "http://localhost:8000/api/v1"

import {getData} from "../utils/localstorage.js"

//请求方式
const method = {
    GET:"GET",
    POST:"POST",
    PUT:"PUT",
    DELETE:"DELETE",
}

//请求头headers ： 响应数据类型  / Token
// application/x-www-form-urlencoded; charset=UTF-8
// application/json; charset=UTF-8

const contentType = {
    JSON : "application/json;charset=UTF-8",
    FORM : "application/x-www-form-urlencoded; charset=UTF-8"
};

const getHeaders = ()=>{ 
    const token  = getData('token')
    console.log('token',token)
    const headers  ={
        "Content-Type":contentType.JSON,
        "Authorization":`Token ${token}`
    }

    return headers
}


// 请求方法
// GET 
const getRequest = async (url)=>{
    const response = await fetch(baseURL+url,{
        method:method.GET,
        headers:getHeaders()
    })
    return response.json()
}

// post
const postRequest = async (url,body)=>{
    const response = await fetch(baseURL+url,{
        method:method.POST,
        headers:getHeaders(),
        body:JSON.stringify(body)  //js对象 => 字符串
    })
    return response.json()
}

// put
const putRequest = async (url,body)=>{
    const response = await fetch(baseURL+url,{
        method:method.PUT,
        headers:getHeaders(),
        body:JSON.stringify(body)  //js对象 => 字符串
    })
    return response.json()
}

// DELETE :url携带id : 文章id  / 评论id
const deleteRequest = async (url)=>{
    const response = await fetch(baseURL+url,{
        method:method.DELETE,
        headers:getHeaders(),
    })
    return response.json()
}

export default {
    get:getRequest, //获取
    post:postRequest, //新增
    put:putRequest, //更新
    delete:deleteRequest, //删除
}
