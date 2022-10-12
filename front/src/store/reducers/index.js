//根reducer文件
import {combineReducers} from "redux"
import {connectRouter} from 'connected-react-router'
import userReducer from "./user"
import articleReducer from "./article"
// const rootReducer = combineReducers({
//     user:userReducer,
//     article:articleReducer
// }) 
//更改为集成路由的方式
const createRootReducer = (history)=>combineReducers({
    user:userReducer,
    article:articleReducer,
    router:connectRouter(history) //监听路由
})
export default createRootReducer