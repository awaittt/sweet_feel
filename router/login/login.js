//登录和注册

const router =require('koa-router')()//实例化


const result=require('../../config/main')
const {regcheck}= require('../../config/check')
//操作数据库的接口
 const {getToken}=require('../../config/database')
 //获取token的接口
 const {gentoken}=require('../../token/jwt')

//验证token合法性
const {Auth}=require('../../token/auth')

 const geturl=`https://api.weixin.qq.com/tcb/databasequery?access_token=`//云数据库查询
 const addurl=`https://api.weixin.qq.com/tcb/databaseadd?access_token=`//云数据库插入

//注册接口
router.post('/register',async ctx=>{
  
    //注册账号密码是否合法
    let {account,password}=ctx.request.body

    new regcheck(ctx,account,password).start()

    //账号是否已经注册过
    const query=`db.collection(\"bussiness-acc\").where({account:'${account}'}).get()`

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

            new result(ctx,'注册成功').answer()
            
        }
    }catch(e){
        new result(ctx,'注册失败,服务器发生错误').answer()
    }

})

router.post('/login', async ctx=>{
    let {account,password}=ctx.request.body
    new regcheck(ctx,account,password).start()

    //数据库查询账号密码
    const query=`db.collection(\"bussiness-acc\").where({account:'${account}',password:'${password}'}).get()`
    try{
        const user=await new getToken().getData(geturl,query)
        if(user.data.length===0){
            new result(ctx,'账号或者密码错误',202).answer()
        }else{
            const Obj=JSON.parse(user.data[0])
           new result(ctx,'登录成功',200,{token:gentoken(Obj.uid)}).answer()
        }
    }catch(e){
        new result(ctx,'登录失败,服务器发生错误',500).answer()

    }

})

router.get('/ceshi',new Auth().m,async (ctx)=>{
    console.log('123')
})

module.exports=router.routes()