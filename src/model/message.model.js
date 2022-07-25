const { DataTypes } = require('sequelize')//DataTypes字段类型
const seq = require('../db/seq')

// 定义表名、字段、数据类型、限制条件、描述

// 留言板-表
const message = seq.define('myblog_message', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        comment: '留言者名称',
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        comment: '留言内容',
    },
})




// message.sync({ force: true })//强制同步-可用于创建表
module.exports = { message }