const axios =require('axios')
const qs= require('querystring')
const result=require('./handle')

let param=qs.stringify({
    grant_type:'client_credential',
    appid:'wxf0e6bab478ab515e',
    secret:'73b42c2aefd3eb921721330bf5b100d6',
})
//必须得到token才能操作云开发数据库
let url='https://api.weixin.qq.com/cgi-bin/token?'+param

class getToken{
        constructor(){

        }
        //获取token
        async gettoken(){
            try{
                let token=await axios.get(url)
                console.log(token)
                if(token.status===200){
                    return token.data.access_token
                }else{
                    //统一抛出错误到catch
                    throw '获取token错误'
                }
            }catch(e){
                console.log(e)
                throw new result(e,500)
            }
        }
}

module.exports={getToken}