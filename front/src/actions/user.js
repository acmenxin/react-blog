import * as constant from "../constant"

export const registUpdate = (key,value)=>{
    console.log("registUpdate2");
    return {type:constant.USER_REGIST,key,value}
}