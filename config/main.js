//统一返回前端的body响应

class result {
    constructor(ctx,msg='SUCCESS',code=200,data=null,extra=null){
            this.ctx=ctx
            this.msg=msg

            this.data=data
            this.extra=extra
            this.code=code


    }
    answer(){
        this.ctx.body={
            msg:this.msg,
            data:this.data,
            extra:this.extra//额外数据非必填

        }
    }
}

module.exports=result