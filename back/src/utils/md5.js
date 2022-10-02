const md5 = require("md5")
const SALT="salt"

const md5Password = (password)=>{
    return new Promise((resolve,reject)=>{
        const md5PWD=md5(password+SALT)
        resolve(md5PWD)
    })
}
module.exports=md5Password