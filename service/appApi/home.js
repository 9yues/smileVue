const Router = require('koa-router')

let router = new Router()
router.get('/', async (ctx) => {
    ctx.body = 'home'
})


module.exports = router