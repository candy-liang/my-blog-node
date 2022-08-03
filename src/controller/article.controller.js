// 定义控制器-将参数传递给数据库并处理数据库返回的数据

const {
    createArticleClass,
    deleteArticleClass,
    getArticleClass,
    createArticle,
    deleteArticle,
    getArticleDetail,
    updateArticleDetail,
    getHotArticleList,
    getNearArticle,
    getArticleList
} = require('../service/article.service')

class ArticleController {
    // 创建文章分类
    async createArticleClass(ctx, next) {
        const { id, name, type, old_type, sort } = ctx.request.body
        console.log(name, type, sort);
        const res = await createArticleClass(id, name, type, old_type, sort)
        ctx.body = {
            code: 0,
            message: '创建文章分类成功',
            result: ''
        }
    }
    // 删除文章分类
    async deleteArticleClass(ctx, next) {
        const { type } = ctx.request.body
        const res = await deleteArticleClass(type)
        ctx.body = {
            code: 0,
            message: '删除文章分类成功',
            result: ''
        }
    }
    // 获取文章分类
    async getArticleClass(ctx, next) {
        const list = await getArticleClass()
        let label = {}
        list.forEach(v => {
            label[v.type] = v.name
        })
        ctx.body = {
            code: 0,
            message: '获取分类成功',
            result: { list, label }
        }
    }

    // 创建文章
    async createArticle(ctx, next) {
        const { id, title, type, description, sort, poster, status } = ctx.request.body
        const res = await createArticle(id, title, type, description, sort, poster, status)
        ctx.body = {
            code: 0,
            message: '创建/修改文章简要成功',
            result: ''
        }
    }
    // 删除文章
    async deleteArticle(ctx, next) {
        const { id } = ctx.request.body
        const res = await deleteArticle(id)
        ctx.body = {
            code: 0,
            message: '删除文章成功',
            result: ''
        }
    }
    // 获取文章列表
    async getArticleList(ctx, next) {
        const { type, current_page = 1, page_size = 5, key, isAll } = ctx.request.body
        const res = await getArticleList(type, current_page, page_size, key, isAll)
        ctx.body = {
            code: 0,
            message: '获取文章列表成功',
            result: res
        }
    }
    // 获取热门文章列表
    async getHotArticleList(ctx, next) {
        const res = await getHotArticleList()
        ctx.body = {
            code: 0,
            message: '获取热门文章列表成功',
            result: res
        }
    }
    // 获取文章详情
    async getArticleDetail(ctx, next) {
        const { id } = ctx.request.body
        const res = await getArticleDetail(id)
        const { pre_article, next_article } = await getNearArticle(id)
        ctx.body = {
            code: 0,
            message: '获取文章详情成功',
            result: { res, pre_article, next_article }
        }
    }
    // 修改文章详情
    async updateArticleDetail(ctx, next) {
        const { id, md_html, text } = ctx.request.body
        const res = await updateArticleDetail(id, md_html, text)
        ctx.body = {
            code: 0,
            message: '修改文章详情成功',
            result: res
        }
    }
}
module.exports = new ArticleController()