const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const sendAutoDeleteMessage = require('./functions/sendAutoDeleteMessage');
const setupAutoNoti = require('./functions/autonoti');
const sendUptime = require('./functions/uptime');

// Thêm trực tiếp thông tin vào mã nguồn
const token = "nhập token bot ";
const adminId = "nhập id admin";
const groupId = "nhập id group";

// Khởi tạo bot với token
const bot = new TelegramBot(token, { polling: true });

// Tự động import tất cả các module trong thư mục "mdl/"
const mdlPath = path.join(__dirname, 'mdl');
fs.readdirSync(mdlPath).forEach((file) => {
    if (file.endsWith('.js')) {
        require(`./mdl/${file}`)(bot, { adminId, groupId });
    }
});

// Lắng nghe lệnh /start
bot.onText(/\/start/, (msg) => {
    sendAutoDeleteMessage(bot, msg.chat.id, 'Xin chào! Tôi là bot của TNT.');
});

bot.onText(/\/uptime/, (msg) => {
    sendUptime(bot, msg.chat.id);
});

// Gửi thông báo khi bot khởi động
sendAutoDeleteMessage(bot, adminId, 'Bot đã khởi động và sẵn sàng hoạt động!');
setupAutoNoti(bot, groupId);
