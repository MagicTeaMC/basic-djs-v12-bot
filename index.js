const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
client.config = config;
console.log("即將啟動機器人");
console.log("正在載入檔案");

fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`已讀取事件檔案: ${eventName}.js`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log(`Command 已讀取: ${commandName}.js`);
    });
});


client.login(config.token);

client.on("ready", async() => {
    console.log(`${client.user.username} 已上線`);
    client.user.setActivity({
        name: `貓月牌測試機器人`,
        type: "PLAYING",
    });
});