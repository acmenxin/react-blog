const initServer = async (app) => {
    return new Promise((resolve,reject)=>{
        const PORT = process.env.PORT || 8080
        app.listen(PORT, () => {
            console.log(`SERVER is running on http://localhost:${process.env.PORT}`);
            resolve()
        })
        .on('error',(error)=>{
            console.log(error,`SERVER is running on http://localhost:${process.env.PORT}`);
            reject()
        })
    })
}
module.exports = initServer