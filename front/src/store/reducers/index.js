//根reducer文件
import {combineReducers} from "redux"
import {connectRouter} from 'connected-react-router'
import userReducer from "./user"
import articleReducer from "./articles"
import profileReducer from "./profile"
import articleNewReducer from "./article"
import commentReducer from "./comment"
// const rootReducer = combineReducers({
//     user:userReducer,
//     article:articleReducer
// }) 
//更改为集成路由的方式
const createRootReducer = (history)=>combineReducers({
    user:userReducer,
    article:articleNewReducer,
    articles:articleReducer,
    profile:profileReducer,
    comment:commentReducer,
    router:connectRouter(history) //监听路由
})
export default createRootReducer