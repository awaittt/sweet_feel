const result=require('./handle')


class Checking{

    constructor(ctx,...obj){
        this,ctx=ctx
        this.obj=obj
    }
    
    Errunder(){
        let bvc=this.obj.indexOf(undefined)
        if(bvc!=-1){
            throw new result('参数填写错误')

        }
    }
    //校验手机号码
    Phone(num){
        let phone=/^1[3-9]\d\d{4}\d{4}$/
        if(!phone.test(this.obj[num])){
            throw new result('手机号码错误',202)
        }
    }
    //密码校验
    Password(num){
        let reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
        if(!reg.test(this.obj[num])){
            throw new result('密码需要大于6位的数字|字母',202)

        }
    }
}

//注册校验
class regcheck extends Checking{
      start(){
        super.Errunder()
        super.Phone(0)
        super.Password(1)
      }
}

module.exports={regcheck}