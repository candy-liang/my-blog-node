const { DataTypes } = require('sequelize')//DataTypes字段类型
const seq = require('../db/seq')

// 定义表名、字段、数据类型、限制条件、描述

// 文章分类-表
const friendLink = seq.define('myblog_friend_link', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        comment: '友链的名称',
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        comment: '友链的logo链接',
    },
    introduction: {
        type: DataTypes.STRING,
        defaultValue: '这人很懒，什么都没留下~',
        comment: '友链的简介',
    },
    link: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false,
        comment: '友链的地址',
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'hide',
        comment: '友链的状态',
    },
    sort: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: '排序权重',
    },
})




// friendLink.sync({ force: true })//强制同步-可用于创建表
module.exports = { friendLink }