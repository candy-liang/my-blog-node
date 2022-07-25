// 数据库操作-增删改查

const { message } = require('../model/message.model')//引入对应的表
const { Op } = require("sequelize");
class MessageService {

    // 创建留言
    async createMessage(name, content) {
        console.log(name);
        return await message.create({ name, content })//增
    }

    // 删除留言
    async deleteMessage(id) {
        return await message.destroy({
            where: { id: { [Op.or]: [...id] } }
        })
    }

    // 获取留言
    async getMessage(current_page, page_size, key) {
        let whereObj = {}
        key && Object.assign(whereObj, { name: { [Op.like]: `%${key}%` } });// 加入模糊查询
        const list = await message.findAll({
            where: whereObj,
            limit: page_size,
            offset: (current_page - 1) * page_size,
            order: [['createdAt']]
        })
        const total = await message.count({ where: whereObj })
        return { list, total }
    }

}
module.exports = new MessageService()