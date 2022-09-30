//自定义错误组件=>状态码，信息，错误点
class HttpException extends Error{
    constructor(status,message,errors){
        super()
        this.status=status
        this.message=message
        this.errors=errors
    }
}

module.exports = HttpException