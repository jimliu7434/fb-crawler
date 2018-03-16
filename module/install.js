// create mysql connection
const sequelizebase = require('../class/sequelizebase');
global.mysql = new sequelizebase();

module.exports = () => {
    // install all mysql table here
    const Friends = require('../class/sequelize/friends');
    Friends.sync();
};