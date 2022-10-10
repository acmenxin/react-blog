//根reducer文件
import {combineReducers} from "redux"
import userReducer from "./user"
import articleReducer from "./article"
const rootReducer = combineReducers({
    user:userReducer,
    article:articleReducer
})
export default rootReducer