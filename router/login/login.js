//登录和注册

const router =require('koa-router')()//实例化


const result=require('../../config/main')
const {regcheck}= require('../../config/check')
//操作数据库的接口
 const {getToken}=require('../../config/database')

//注册接口
router.post('/register',async ctx=>{
    //操作数据库
    // new getToken().gettoken()
    //总的响应
    // new result(ctx).answer()
    let {account,password}=ctx.request.body

    new regcheck(ctx,account,password).start()
    })

module.exports=router.routes()