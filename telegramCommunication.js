const fs = require("fs");
const TelegramBot = require('node-telegram-bot-api');
const token = JSON.parse(fs.readFileSync('config.json')).TelegramBotID;
const chatId = JSON.parse(fs.readFileSync('config.json')).TelegramChatID;

const bot = new TelegramBot(token, { polling: false });

const telegrambot = (message) => {
    try {
        bot.sendMessage(chatId, message, {
            parse_mode: 'html'
        });
    } catch (err) {
        console.log('Something went wrong when trying to send a Telegram notification', err);
    }
}

module.exports = {
    telegrambot
}