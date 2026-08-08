const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const { handleReceptionCommand } = require("./command1");
const { handleCommand } = require("./commands");

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "kingwhatsbot"
    }),
    puppeteer: {
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ]
    }
});

let botStatus = false;

// QR
client.on("qr", (qr) => {
    console.log("\n📱 امسح QR من واتساب:\n");
    qrcode.generate(qr, { small: true });
});

// جاهز
client.on("ready", () => {
    botStatus = true;

    console.log("================================");
    console.log("🤖 KingWhatsBot اشتغل بنجاح!");
    console.log("================================");
});

// فشل تسجيل الدخول
client.on("auth_failure", (error) => {
    botStatus = false;
    console.error("❌ فشل تسجيل الدخول:", error);
});

// فصل الحساب
client.on("disconnected", (reason) => {
    botStatus = false;
    console.log("❌ تم فصل البوت:", reason);
});

// استقبال الرسائل
client.on("message", async (message) => {
    try {
        // جروب الاستقبال
        const receptionReply = handleReceptionCommand(
            message,
            botStatus
        );

        if (receptionReply) {
            await message.reply(receptionReply);
            return;
        }

        // الجروب الأساسي
        const commandReply = handleCommand(
            message,
            botStatus
        );

        if (commandReply) {
            await message.reply(commandReply);
        }

    } catch (error) {
        botStatus = false;
        console.error("❌ حصل خطأ:", error);
    }
});

// تشغيل البوت
client.initialize();
