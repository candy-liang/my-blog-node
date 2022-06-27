// 数据库操作-增删改查

const { Article, ArticleClass } = require('../model/article.model')//引入对应的表

class ArticleService {
    async createArticleClass(name, type) {
        const res = await ArticleClass.create({ name, type })//增
        return res
    }
    async getArticleClass() {
        const res = await ArticleClass.findAll()//查
        return res
    }
    async createArticle(title, type, tag, description, md_html, catalog_list) {
        const res = await Article.create({ title, type, tag, description, md_html, catalog_list })//增
        await ArticleClass.increment({ count: 1 }, { where: { type: type } })
        return res
    }
    async getArticleList(type, current_page, page_size) {
        let whereObj = type == 'all' ? {} : { type: type }
        const res = await Article.findAll({
            where: whereObj,
            limit: page_size,
            offset: current_page - 1,
            order: [
                ['createdAt', 'DESC']//倒序
            ]
        })//查询
        return res
    }
}
module.exports = new ArticleService()