
const followController =async (res,req,next)=>{
    try {
       console.log("ok");
    } catch (error) {
        next(error)
    }
}
module.exports = {followController}