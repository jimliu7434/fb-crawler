const mysql = global.mysql;
const Sequelize = mysql.Sequelize;
const db = mysql.db;

module.exports = db.define('Friends',
    {
        Id: {
            primaryKey: true,
            type: Sequelize.STRING,
        },
        FriendId: {
            primaryKey: true,
            type: Sequelize.STRING
        },
    },
    {
        tableName: 'Friends',
        timestamps: false,
        freezeTableName: true,
    });