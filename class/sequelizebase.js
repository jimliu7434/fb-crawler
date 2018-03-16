const Sequelize = require('sequelize');
const config = require('../config/config').mysql;

class sequelize {
    constructor() {
        this.db = new Sequelize(config.options.database, config.user, config.password, {
            host: config.server,
            port: config.options.port,
            dialect: 'mysql',
            logging: console.debug,
            //logging: null,
            pool: {
                max: 10,
            },
            operatorsAliases: false,
        });

        this.Sequelize = Sequelize;
    }
}


module.exports = sequelize;


