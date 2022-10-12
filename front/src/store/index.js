import {createStore,applyMiddleware} from "redux";
// import rootReducer from "./reducers/index"
import createRootReducer from "./reducers";
//01引包
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk"
//ui - action - middleware(thunk) -action - store - reducer - state - ui
//最初未集成eg:告诉store有没有中间件
// const store = createStore(rootReducer,applyMiddleware(thunk))
//02创建history
export const history = createBrowserHistory()
//03 集成redux
export const store = createStore(createRootReducer(history),applyMiddleware(routerMiddleware(history),thunk))
export default store
