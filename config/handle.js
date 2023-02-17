//全局错误处理

class DataResult extends Error{
    constructor(msg,code){
        super()
        this.msg=msg
        this.code=code
    }
}

module.exports=DataResult