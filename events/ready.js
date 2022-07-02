const config = require('../config.json');

module.exports = async(client) => {

    let usersCount = 0;
    for (const guild of client.guilds.cache) {
        usersCount += (await guild[1].members.fetch()).size
    }

    await console.log(`${client.user.tag} 成功連結到Discord !! 並開始服務 ${usersCount} 個使用者`)

}