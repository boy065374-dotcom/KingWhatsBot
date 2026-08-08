const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const { handleReception } = require("./Ist_group");
const { handleCommand } = require("./commands");
const groupLinks = require("./group_links");

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

// QR Code
client.on("qr", (qr) => {
    console.log("\n📱 امسح QR من واتساب:\n");
    qrcode.generate(qr, { small: true });
});

// جاهز
client.on("ready", () => {
    console.log("================================");
    console.log("🤖 KingWhatsBot اشتغل بنجاح!");
    console.log("📥 الاستقبال:", groupLinks.receptionGroup);
    console.log("🏠 الأساسي:", groupLinks.commandGroup);
    console.log("================================");
});

// فشل المصادقة
client.on("auth_failure", (error) => {
    console.error("❌ فشل تسجيل الدخول:", error);
});

// فصل الحساب
client.on("disconnected", (reason) => {
    console.log("❌ تم فصل البوت:", reason);
});

// استقبال الرسائل
client.on("message", async (message) => {
    try {
        // نظام الاستقبال
        const receptionHandled = await handleReception(message);

        if (receptionHandled) {
            return;
        }

        // الأوامر
        const reply = handleCommand(message.body);

        if (reply) {
            await message.reply(reply);
        }

    } catch (error) {
        console.error("❌ حصل خطأ:", error);
    }
});

// تشغيل البوت
client.initialize();
