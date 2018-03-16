const express = require('express');
const router = express.Router();
const FriendsDB = new (require('../module/friends'));
const FbCrawler = require('../module/fbcrawler');
const Response = require('../class/response');

router.post('/promise', (req, res) => {
    const { name } = req.body;

    // error handling
    if (!name) {
        res.send(new Response('參數錯誤', undefined)).status(200);
        return;
    }

    let fb = new FbCrawler();

    // Promise 寫法
    // 爬 friends
    fb.getFriends(name)
        .then((fbresponse) => {
            if (fbresponse.error) {
                throw fbresponse.error;
            }

            // 將 friend ids 轉為 Set 去除可能重複項
            const fids = new Set(fbresponse.friends.data);
            const id = fbresponse.id;

            // add to db
            return FriendsDB.add(id, fids)
        })
        .then(() => {
            res.send(new Response(undefined, 'OK')).status(200);
        })
        .catch((err) => {
            console.error(`Error: ${err}`);
            if (err.type === 'OAuthException') {
                res.send(new Response('AccessToken is lost or expired', undefined)).status(500);
            }
            else
                res.send(new Response('資料庫錯誤', undefined)).status(500);
        });
});

router.post('/async', async (req, res) => {
    const { name } = req.body;

    // error handling
    if (!name) {
        res.send(new Response('參數錯誤', undefined)).status(200);
        return;
    }

    // Async 寫法
    try {
        // 爬 friends
        let fb = new FbCrawler();
        let fbresponse = await fb.getFriends(name);
        if (fbresponse.error) {
            throw fbresponse.error;
        }

        // 將 friend ids 轉為 Set 去除可能重複項
        const fids = new Set(fbresponse.friends.data);
        const id = fbresponse.id;

        // add to db
        await FriendsDB.add(id, fids);

        res.send(new Response(undefined, 'OK')).status(200);
    }
    catch (err) {
        console.error(`Error: ${err}`);
        if (err.type === 'OAuthException') {
            res.send(new Response('AccessToken is lost or expired', undefined)).status(500);
        }
        else
            res.send(new Response('資料庫錯誤', undefined)).status(500);
    }
});

module.exports = router;