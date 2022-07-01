const { Sequelize } = require('sequelize')//sequelize连接/操控数据库的插件
const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB,
} = require('../../config/config.default')

// 连接到数据库
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    dialect: 'mysql',//数据库类型
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    },
    timezone: '+08:00' //改为标准时区
})
//测试连接
seq.authenticate().then(() => {
    console.log('数据库连接成功')
}).catch((err) => {
    console.log('数据库连接失败', err)
})

module.exports = seq