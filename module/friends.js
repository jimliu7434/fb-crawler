const f = require('../class/sequelize/friends');
const Sequelize = require('sequelize');

class Friends {
    constructor() { }

    /**
     * 向 mysql 寫入 id & friend' ids    
     * @param {string} id 
     * @param {set} fids 
     * @returns {Promise}
     */
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

    /**
     * 查詢 idA 與 idB 的共同好友ID
     * @param {string} idA 
     * @param {string} idB 
     * @returns {array} mutual friends id list
     */
    async getMutualFriend(idA, idB) {
        const db = global.mysql.db;
        let query = '';
        query += `SELECT FriendId `;
        query += `FROM Friends `
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