//登录和注册

const router =require('koa-router')()//实例化


const result=require('../../config/main')
const {regcheck}= require('../../config/check')
//操作数据库的接口
 const {getToken}=require('../../config/database')

//注册接口
router.post('/register',async ctx=>{
  
    //注册账号密码是否合法
    let {account,password}=ctx.request.body

    new regcheck(ctx,account,password).start()

    //账号是否已经注册过
    const query=`db.collection(\"bussiness-acc\").where({account:'${account}'}).get()`
    const geturl=`https://api.weixin.qq.com/tcb/databasequery?access_token=`
    const addurl=`https://api.weixin.qq.com/tcb/databaseadd?access_token=`

    try{
        const user=await new getToken().getData(geturl,query)
        if(user.data.length>0){
                new result(ctx,'已经注册过',202).answer()
        }else{
            //没住注册过【账号、密码、uid、商家唯一标识】
            //生成商家标识uid
            const uid=new Date().getTime()
            const struid=JSON.stringify(uid)
            const OBJ={account,password,uid:struid}
            const STR=JSON.stringify(OBJ)
            const addquery=`db.collection(\"bussiness-acc\").add({data:${STR}})`
            const res= await new getToken().getData(addurl,addquery) 
            console.log(res)

            
        }
    }catch(e){
        console.log(e)

    }

})

module.exports=router.routes()