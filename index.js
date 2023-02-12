const Koa =require('koa')
const app=new Koa()
const bodyParser=require('koa-bodyparser')
const json=require('koa-json')
const cors=require('koa2-cors')
const router=require('koa-router')()

app.use(cors())
app.use(json())
app.use(bodyParser())


//全局异常处理
const abnormal=require('./config/abnormal')
app.use(abnormal)


//注册 登录
const login=require('./router/login/login')

//配置路由接口
router.use('/api',login)


app.use(router.routes()).use(router.allowedMethods())

app.listen('8080')
console.log('8080端口已经启动')