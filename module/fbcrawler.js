const config = require('../config/config');
const request = require('request');

class Crawler {
    constructor() {
        let accesstoken = config.fb.accessToken || process.env.ACCESSTOKEN;
        if (!accesstoken) {
            throw new Error(`Please put "Access Token" to config file`);
        }

        this.AccessToken = accesstoken;
    }

    /**
     * 根據輸入的 name 向 FB 查詢所有朋友ID
     * @param {string} name 
     * @returns {string} id
     * @returns {array} friends
     */
    getFriends (name) {
        let that = this;
        return new Promise((resolve, reject) => {
            if (!that.AccessToken) {
                reject(new Error(`Please put "Access Token" to config file`));
            }

            request.get(`https://graph.facebook.com/v2.12/${name || 'me'}?fields=id,friends&access_token=${that.AccessToken}`, (err, res) => {
                if (err)
                    reject(err);

                resolve(JSON.parse(res.body));
            });
        });
    };
}

module.exports = Crawler;