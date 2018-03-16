const f = require('../class/sequelize/friends');
const Sequelize = require('sequelize');

class Friends {
    constructor() { }

    async add(id, fids) {
        if (!id)
            return;

        let promiseList = [];
        for (const fid of fids) {
            if (!fid)
                promiseList.push(f.create({
                    Id: id,
                    FriendId: fid,
                }));
        }

        return await Promise.all(promiseList);
    }

    async getMutualFriend(idA, idB) {
        const db = global.mysql.db;
        let query = '';
        query += `SELECT FriendId `;
        query += `FROM Friendship.Friends `
        query += `WHERE Id IN (:ids) `
        query += `GROUP BY FriendId `
        query += `HAVING COUNT(FriendId) > 1 `;
        return await db.query(query, {
            replacements: {
                ids: [idA, idB],
            },
            type: Sequelize.QueryTypes.SELECT,
            raw: true,
        }, );
    }

}

module.exports = Friends;