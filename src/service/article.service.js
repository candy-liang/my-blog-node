// 数据库操作-增删改查

const { Article, ArticleClass } = require('../model/article.model')//引入对应的表
const { Op } = require("sequelize");
class ArticleService {
    // 创建文章分类
    async createArticleClass(name, type) {
        return await ArticleClass.create({ name, type })
    }
    // 删除文章分类
    async deleteArticleClass(type) {
        return await ArticleClass.destroy({
            where: { type: { [Op.or]: [...type] } }
        })
    }
    // 获取文章分类
    async getArticleClass() {
        const res = await ArticleClass.findAll({
            order: [['createdAt']],//倒序
            include: [{
                model: Article,
                as: "counts"
            }]
        });
        res.forEach(v => {
            v.count = v.counts.length
        })
        res[0].count = await Article.count()
        return res
    }
    // 查询文章
    async getArticleList(type, current_page, page_size, key) {
        let whereObj = {}
        type != 'all' && Object.assign(whereObj, { type });
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

    // 创建文章
    async createArticle(title, type, tag, description, md_html, catalog_list) {
        const res = await Article.create({ title, type, tag, description, md_html, catalog_list })//增
        return res
    }
    // 删除文章
    async deleteArticle(id) {
        return await Article.destroy({
            where: { id: { [Op.or]: [...id] } }
        })
    }
    // 获取单个文章
    async getArticleDetail(id) {
        return await Article.findOne({
            where: { id: id }
        })
    }
    // 获取单个文章
    async updateArticleDetail(id, md_html, text, catalogList) {
        return await Article.update({ md_html, text, catalogList }, {
            where: { id: id }
        })
    }




}
module.exports = new ArticleService()