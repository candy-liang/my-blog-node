// 定义控制器-将参数传递给数据库并处理数据库返回的数据

const {
    createArticleClass,
    deleteArticleClass,
    getArticleClass,
    createArticle,
    deleteArticle,
    getArticleList
} = require('../service/article.service')

class ArticleController {
    // 创建文章分类
    async createArticleClass(ctx, next) {
        const { name, type } = ctx.request.body
        const res = await createArticleClass(name, type)
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
    // 删除文章分类
    async deleteArticle(ctx, next) {
        const { id } = ctx.request.body
        const res = await deleteArticle(id)
        ctx.body = {
            code: 0,
            message: '删除文章成功',
            result: ''
        }
    }
    // 获取文章分类
    async getArticleClass(ctx, next) {
        const res = await getArticleClass()
        ctx.body = {
            code: 0,
            message: '获取分类成功',
            result: res
        }
    }
    // 创建文章
    async createArticle(ctx, next) {
        const { title, type, tag, description, md_html, catalog_list } = ctx.request.body
        const res = await createArticle(title, type, tag, description, md_html, catalog_list)
        ctx.body = {
            code: 0,
            message: '创建文章成功',
            result: ''
        }
    }
    // 获取文章列表
    async getArticleList(ctx, next) {
        console.log(ctx.request.body);
        const { type, current_page = 1, page_size = 5, key } = ctx.request.body
        const res = await getArticleList(type, current_page, page_size, key)
        ctx.body = {
            code: 0,
            message: '获取文章列表成功',
            result: res
        }
    }
}
module.exports = new ArticleController()