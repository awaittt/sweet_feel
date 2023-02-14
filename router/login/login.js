//登录和注册

const router =require('koa-router')()//实例化


const result=require('../../config/main')

//操作数据库的接口
 const {getToken}=require('../../config/database')

//注册接口
router.get('/register',async ctx=>{
    console.log("8006")
    //操作数据库
    // new getToken().gettoken()
    //总的响应
    // new result(ctx).answer()

    let url='https://api.weixin.qq.com/tcb/databaseadd?access_token='
    let query=`db.collection(\"test\").add({data:{name:'王五'}})`
        let data=  new getToken().getData(url,query)
        if(data){
            ctx.body='云数据库启用'
        }
    })

module.exports=router.routes()