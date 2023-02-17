const basicAuth=require('basic-auth')
const jwt=require('jsonwebtoken')
const security=require('./tokentime').security
const result=require('../config/handle')

class Auth{
    constructor(){

    }
    //取值函数
    get m(){
        //中间件
        return async(ctx,next)=>{
            const token=basicAuth(ctx.req)
            console.log(token)
            if(!token||!token.name){
                throw new result({errcode:'401',msg:'没有访问权限'},401)

            }
            //真正验证token合法性
            try{

                var authcode=jwt.verify(token.name,security.secreatkey)
                console.log(authcode)
            }catch(e){
                if(e.name==='TokenExpiredError'){
                    throw new result({errcode:'401',msg:'账号已过期，请重新登录'},401)
                }
                    throw new result({errcode:'401',msg:'没有访问权限'},401)
                
            }
            ctx.auth={
                uid: authcode.uid,
                
            }
           console.log(token)
            await next()
        }
        
    }
}

module.exports={Auth}