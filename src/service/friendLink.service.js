// 数据库操作-增删改查

const { friendLink } = require('../model/friendLink.model')//引入对应的表
const { Op } = require("sequelize");
class FriendLinkService {

    // 创建友链
    async createFriendLink(id, name, logo, introduction, link, status, sort) {
        let params = { name, logo, introduction, link, status, sort }
        if (id) {
            return await friendLink.update(params, { where: { id: id } })//改
        } else {
            return await friendLink.create(params)//增
        }
    }

    // 删除友链
    async deleteFriendLink(id) {
        return await friendLink.destroy({
            where: { id: { [Op.or]: [...id] } }
        })
    }

    // 获取友链
    async getFriendLink(current_page, page_size, key) {
        let whereObj = {}
        key && Object.assign(whereObj, { name: { [Op.like]: `%${key}%` } });// 加入模糊查询
        const total = await friendLink.count({ where: whereObj })
        const list = await friendLink.findAll({
            where: whereObj,
            limit: page_size,
            offset: (current_page - 1) * page_size,
            order: [['createdAt']]
        })
        return { list, total }
    }

}
module.exports = new FriendLinkService()