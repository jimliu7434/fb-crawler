const config = require('./config/config');
const FB = require('fb');
const APPID = config.fb.appId || process.env.APPID;
const APPSECRET = config.fb.appSecret || process.env.APPSECRET;
FB.options(
    {
        version: config.fb.version,
        appId: APPID,
        appSecret: APPSECRET,
    },
);
global.FB = FB;

const getAccessToken = () => {
    return new Promise((resolve, reject) => {
        FB.api('oauth/access_token',
            {
                client_id: APPID,
                client_secret: APPSECRET,
                grant_type: 'client_credentials'
            },
            (res) => {
                if (!res || res.error) {
                    reject(res.error || new Error(`get accesstoken no response`))
                }

                resolve(res.access_token);
            });
    });
};


const getFriends = () => {
    return new Promise((resolve, reject) => {
        FB.api(
            '/me',
            {
                fields: 'id,name,friends'
            },
            (res) => {
                if (!res || res.error) {
                    reject(res.error || new Error(`get friends no response`));
                }
                resolve(res);
            });
    });
};

const init = async () => {
    let accesstoken = await getAccessToken();

    let friends = await getFriends();
    console.log(friends);
}

init();
