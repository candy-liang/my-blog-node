// 定义路由、接口名
const Router = require('koa-router')
const router = new Router({ prefix: '/message' })
const {
    createMessage,
    deleteMessage,
    getMessage,
} = require('../controller/message.controller')

router.post('/createMessage', createMessage)
router.post('/deleteMessage', deleteMessage)
router.post('/getMessage', getMessage)


module.exports = router