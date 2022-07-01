// 数据库操作-增删改查

const { Article, ArticleClass } = require('../model/article.model')//引入对应的表
const { Op } = require("sequelize");
class ArticleService {
    //增
    async createArticleClass(name, type) {
        return await ArticleClass.create({ name, type })
    }
    //删
    async deleteArticleClass(type) {
        return await ArticleClass.destroy({
            where: { type: { [Op.or]: [...type] } }
        })
    }
    //删
    async deleteArticle(id) {
        return await Article.destroy({
            where: { id: { [Op.or]: [...id] } }
        })
    }
    // 改
    async updateClass(type) {
        const count = await Article.count({ where: type == 'all' ? {} : { type: type } })
        await ArticleClass.update({ count: count }, { where: { type } })
    }
    async getArticleClass() {
        const res = await ArticleClass.findAll()
        return res
    }
    async createArticle(title, type, tag, description, md_html, catalog_list) {
        const res = await Article.create({ title, type, tag, description, md_html, catalog_list })//增
        await ArticleClass.increment({ count: 1 }, { where: type == 'all' ? {} : { type } })
        return res
    }
    // 查
    async getArticleList(type, current_page, page_size, key) {
        let whereObj = {}
        type !== 'all' && Object.assign(whereObj, { type });
        key && Object.assign(whereObj, { title: { [Op.like]: `%${key}%` } });// 加入模糊查询

        const list = await Article.findAll({
            where: whereObj,
            limit: page_size,
            offset: (current_page - 1) * page_size,
            order: [['createdAt', 'DESC']],//倒序
            attributes: { exclude: ['md_html', 'catalog_list'] }
        })//查询
        const total = await Article.count({ where: whereObj })
        return { list, total }
    }
}
module.exports = new ArticleService()