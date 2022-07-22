// 定义控制器-将参数传递给数据库并处理数据库返回的数据

const {
    createFriendLink,
    deleteFriendLink,
    getFriendLink,
} = require('../service/friendLink.service')

class FriendLinkController {
    // 创建友链
    async createFriendLink(ctx, next) {
        const { id, name, logo, introduction, link, status, sort } = ctx.request.body
        const res = await createFriendLink(id, name, logo, introduction, link, status, sort)
        ctx.body = {
            code: 0,
            message: '创建/修改友链成功',
            result: ''
        }
    }
    // 删除友链
    async deleteFriendLink(ctx, next) {
        const { id } = ctx.request.body
        const res = await deleteFriendLink(id)
        ctx.body = {
            code: 0,
            message: '删除友链成功',
            result: ''
        }
    }
    // 获取友链
    async getFriendLink(ctx, next) {
        const { current_page = 1, page_size = 5, key } = ctx.request.body
        const res = await getFriendLink(current_page, page_size, key)
        ctx.body = {
            code: 0,
            message: '获取友链成功',
            result: res
        }
    }

   
}
module.exports = new FriendLinkController()