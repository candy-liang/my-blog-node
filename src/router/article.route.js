// 定义路由、接口名
const Router = require('koa-router')
const router = new Router({ prefix: '/article' })
const {
    getArticleClass,
    createArticleClass,
    deleteArticleClass,
    createArticle,
    deleteArticle,
    getArticleDetail,
    updateArticleDetail,
    getArticleList
} = require('../controller/article.controller')

router.post('/createArticleClass', createArticleClass)
router.post('/deleteArticleClass', deleteArticleClass)
router.post('/deleteArticle', deleteArticle)
router.post('/getArticleClass', getArticleClass)

router.post('/createArticle', createArticle)
router.post('/getArticleList', getArticleList)
router.post('/getArticleDetail', getArticleDetail)
router.post('/updateArticleDetail', updateArticleDetail)

module.exports = router