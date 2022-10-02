const md5 = require("md5")
const SALT="salt"

const md5Password = (password)=>{
        const md5PWD=md5(password+SALT)
        return md5PWD
}
const matchPWD= (DbPassword,LoginPassword)=>{
        let loginpassword = md5Password(LoginPassword)
        if(loginpassword===DbPassword){
           return true
        }
        return false
}
module.exports={md5Password,matchPWD}