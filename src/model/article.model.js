const { DataTypes } = require('sequelize')//DataTypes字段类型
const seq = require('../db/seq')

// 定义表名、字段、数据类型、限制条件、描述

// 文章分类-表
const ArticleClass = seq.define('myblog_article_class', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '分类的名称',
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '分类的类型key',
    },
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '该分类文章的数量',
    },
})

const Article = seq.define('myblog_article', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '文章标题'
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '文章所属分类'
    },
    tag: {
        type: DataTypes.STRING,
        comment: '文章所属标签'
    },
    description: {
        type: DataTypes.STRING,
        comment: '文章描述'
    },
    md_html: {
        type: DataTypes.STRING,
        comment: '文章详情html'
    },
    catalog_list: {
        type: DataTypes.STRING,
        comment: '内容目录'
    },
})

// ArticleClass.sync({ force: true })//强制同步-可用于创建表
module.exports = { ArticleClass, Article }