const Koa = require('koa')
const app = new Koa()
const {connect, initSchemas} = require('./database/init')
const mongoose = require('mongoose')
const Router = require('koa-router')
// 用于处理post处理
const bodyParser = require('koa-bodyparser')
// 处理跨域
const cors = require('koa2-cors')

// 注册中间件
app.use(bodyParser())
app.use(cors())

let user = require('./appApi/user')

// 装载所有子路由 
let router = new Router()
router.use('/user', user.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// 立即执行
;(async () => {
    await connect()
    initSchemas()
})()

app.use(async(ctx) => {
    ctx.body = '<h1>hello koa2</h1>';
})

app.listen(3000, ()=> {
    console.log('server starting at port 3000')
})