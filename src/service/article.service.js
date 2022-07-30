// 数据库操作-增删改查

const { Article, ArticleClass } = require('../model/article.model')//引入对应的表
const { Op } = require("sequelize");
class ArticleService {
    // 创建/修改文章分类
    async createArticleClass(id, name, type, old_type, sort) {
        if (id) {

            const res = await ArticleClass.update({ name, type, sort }, {
                where: { id: id }
            })
            if (old_type && type != old_type) {
                await Article.update({ type }, { where: { type: old_type } })
            }
            return res
        } else {
            const res = await ArticleClass.create({ name, type, sort })//增
            return res
        }

    }

    // 删除文章分类
    async deleteArticleClass(type) {
        return await ArticleClass.destroy({
            where: { type: { [Op.or]: [...type] } }
        })
    }

    // 获取文章分类
    async getArticleClass() {
        try {
            const res = await ArticleClass.findAll({
                order: [['createdAt']],//倒序
                include: [{
                    model: Article,
                    as: "counts"
                }]
            });
            // const total = await Article.count()
            const all = {
                id: '-',
                name: '全部分类',
                type: 'all',
                count: await Article.count(),
                createdAt: "—",
                updatedAt: "—",
                sort: 101
            }
            res.forEach(v => {
                v.count = v.counts.length
            })
            res.unshift(all)
            return res
        } catch (error) {
            console.log(error);
        }

    }

    // 获取热门文章
    async getHotArticleList() {
        const res = await Article.findAll({
            limit: 8,
            offset: 0,
            order: [['view_count', 'DESC']],//倒序
            attributes: { exclude: ['md_html', 'text'] }
        })//查询
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

    // 创建文章/修改文章简要
    async createArticle(id, title, type, description, sort, poster, status) {
        if (id) {
            const res = await Article.update({ title, type, description, sort, poster, status }, {
                where: { id: id }
            })
            return res
        } else {
            const res = await Article.create({ title, type, description, sort, poster, status })//增
            return res
        }
    }

    // 删除文章
    async deleteArticle(id) {
        return await Article.destroy({
            where: { id: { [Op.or]: [...id] } }
        })
    }

    // 获取单个文章详情
    async getArticleDetail(id) {
        await Article.increment({ view_count: 1 }, { where: { id: id } })
        return await Article.findOne({
            where: { id: id }
        })
    }
    async getNearArticle(id) {
        const list = await Article.findAll({
            attributes: { include: ['id', 'title'] }
        })//查询
        const index = list.findIndex(v => v.id == id)
        const pre_article = list[index - 1] || ''
        const next_article = list[index + 1] || ''
        return { pre_article, next_article }
    }
    // 修改单个文章详情
    async updateArticleDetail(id, md_html, text) {
        return await Article.update({ md_html, text }, {
            where: { id: id }
        })
    }
}
module.exports = new ArticleService()