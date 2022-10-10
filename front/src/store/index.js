import {createStore,applyMiddleware} from "redux";
import rootReducer from "./reducers/index"
import thunk from "redux-thunk"
//ui - action - middleware(thunk) -action - store - reducer - state - ui
//告诉store有没有中间件
const store = createStore(rootReducer,applyMiddleware(thunk))

export default store
