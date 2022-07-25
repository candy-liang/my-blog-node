// 定义控制器-将参数传递给数据库并处理数据库返回的数据

const {
    createMessage,
    deleteMessage,
    getMessage,
} = require('../service/message.service')

class MessageController {
    // 创建留言
    async createMessage(ctx, next) {
        const { name, content } = ctx.request.body
        await createMessage(name, content)
        ctx.body = {
            code: 0,
            message: '留言成功',
            result: ''
        }
    }
    // 删除留言
    async deleteMessage(ctx, next) {
        const { id } = ctx.request.body
        await deleteMessage(id)
        ctx.body = {
            code: 0,
            message: '删除留言成功',
            result: ''
        }
    }
    // 获取留言
    async getMessage(ctx, next) {
        const { current_page = 1, page_size = 10, key } = ctx.request.body
        const res = await getMessage(current_page, page_size, key)
        ctx.body = {
            code: 0,
            message: '获取留言成功',
            result: res
        }
    }


}
module.exports = new MessageController()