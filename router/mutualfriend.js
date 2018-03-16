const express = require('express');
const router = express.Router();
const FriendsDB = new (require('../module/friends'));
const Response = require('../class/response');

router.get('/promise', (req, res) => {
    const { idA, idB } = req.query;

    // error handling
    if (!idA || !idB) {
        res.send(new Response('參數錯誤', undefined)).status(200);
        return;
    }

    // Promise 寫法
    FriendsDB.getMutualFriend(idA, idB)
        .then((result) => {
            res.send(new Response(undefined, {
                idA: idA,
                idB: idB,
                mutualFriends: result.map((f) => { return f.FriendId; }),
            })).status(200);
        })
        .catch((err) => {
            console.error(`DB Error: ${err}`);
            res.send(new Response('資料庫錯誤', undefined)).status(500);
        });
});

router.get('/async', async (req, res) => {
    const { idA, idB } = req.query;

    // error handling
    if (!idA || !idB) {
        res.send(new Response('參數錯誤', undefined)).status(200);
        return;
    }

    // Async 寫法
    try {
        let result = await FriendsDB.getMutualFriend(idA, idB);

        res.send(new Response(undefined, {
            idA: idA,
            idB: idB,
            mutualFriends: result.map((f) => { return f.FriendId; }),
        })).status(200);
    }
    catch (err) {
        console.error(`DB Error: ${err}`);
        res.send(new Response('資料庫錯誤', undefined)).status(500);
    }
});

module.exports = router;