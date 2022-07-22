// 定义路由、接口名
const Router = require('koa-router')
const router = new Router({ prefix: '/friendLink' })
const {
    createFriendLink,
    deleteFriendLink,
    getFriendLink,
} = require('../controller/friendLink.controller')

router.post('/createFriendLink', createFriendLink)
router.post('/deleteFriendLink', deleteFriendLink)
router.post('/getFriendLink', getFriendLink)


module.exports = router