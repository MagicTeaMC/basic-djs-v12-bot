const config = require('../config.json');

module.exports = (client, message) => {
    // 忽略所有機器人
    if (message.author.bot || !message.guild || message.webhookID || message.channel.type === 'dm') return;

    // 忽略不以前綴開頭的消息（在 config.json 中）
    if (message.content.indexOf(config.prefix) !== 0) return;

    // 標準參數/命令名稱定義。
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // 從 client.commands Enmap 抓取命令數據
    const cmd = client.commands.get(command);

    // 如果該命令不存在，則靜默退出並且什麼也不做
    if (!cmd) return;

    // 運行
    cmd.run(client, message, args);
};