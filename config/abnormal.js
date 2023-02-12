//自定义的全局异常处理中间键
const DataResult=require('./handle')


const abnormal =async(ctx,next)=>{
    try{
await next()//等待下一步
    }catch(err){
        //接受异常错误
       const isErr=  err instanceof DataResult
       if(isErr){
        //得到已知错误
        ctx.body={
            msg:err.msg
        }
        ctx.status=err.code
       }else{
        //未知错误
        ctx.body={
            msg:'出错啦笨蛋0.0'
        }
        ctx.status=500
       }
    }
}

module.exports=abnormal

