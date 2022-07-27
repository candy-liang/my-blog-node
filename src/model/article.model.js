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
    sort: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: '排序权重',
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
    description: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '文章描述'
    },
    poster: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '文章海报'
    },
    text: {
        type: DataTypes.TEXT('long'),
        defaultValue: '',
        comment: '文章详情编辑文本'
    },
    md_html: {
        type: DataTypes.TEXT('long'),
        defaultValue: '',
        comment: '文章详情html'
    },
    view_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '文章被浏览次数'
    },
    sort: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: '排序权重',
    },
})

ArticleClass.hasMany(Article, {
    foreignKey: 'type',
    sourceKey: 'type',
    as: "counts"
});


// Article.sync({ alter: true })//强制同步-可用于创建表
module.exports = { ArticleClass, Article }