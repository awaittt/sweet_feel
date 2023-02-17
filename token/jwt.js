

const jwt=require('jsonwebtoken')

const security=require('./tokentime').security

//token加密生成
function gentoken(uid,scope=2){
    const secreatkey=security.secreatkey
    const expiresIn=security.expiresIn
    const token=jwt.sign({uid,scope},secreatkey,{expiresIn})
    return token
}

module.exports={gentoken}

