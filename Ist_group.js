const groupLinks = require("./group_links");

// الأوامر المسموحة داخل جروب الاستقبال فقط
const ALLOWED_COMMANDS = [".تست", "!تست", "?تست"];

// حالة كل شخص أثناء الاستقبال
const receptionUsers = new Map();

function isAllowedCommand(text) {
    return ALLOWED_COMMANDS.includes(text.trim());
}

function isReceptionGroup(message) {
    return message.from === groupLinks.receptionGroup;
}

async function handleReception(message) {
    if (!isReceptionGroup(message)) {
        return false;
    }

    const text = message.body.trim();

    // السماح بأوامر الاختبار فقط
    if (
        text.startsWith(".") ||
        text.startsWith("!") ||
        text.startsWith("?")
    ) {
        if (isAllowedCommand(text)) {
            return false;
        }

        return true;
    }

    const userId = message.author || message.from;

    // بداية الاستقبال
    if (!receptionUsers.has(userId)) {
        receptionUsers.set(userId, {
            step: "nickname",
            nickname: null,
            image: null
        });

        await message.reply(
            "『        Display       』\n\n" +
            "『منور يا Display، املئ كل اللي تحت』\n\n" +
            "الاستقبال「」التسمية\n" +
            "【اختار لقب:    】\n" +
            "【اختار صورة】\n\n" +
            "ملاحظة: لازم من الانمي"
        );

        return true;
    }

    const user = receptionUsers.get(userId);

    // اختيار اللقب
    if (user.step === "nickname") {
        user.nickname = text;
        user.step = "image";

        await message.reply(
            "『        Display       』\n\n" +
            `『تم تسجيل اللقب: ${text}』\n\n` +
            "【اختار صورة】\n" +
            "ملاحظة: لازم الصورة تكون من الأنمي."
        );

        return true;
    }

    // اختيار الصورة
    if (user.step === "image") {
        if (!message.hasMedia) {
            await message.reply(
                "『        Display       』\n\n" +
                "لازم تبعت صورة من الأنمي 🖼️"
            );

            return true;
        }

        user.image = true;
        user.step = "completed";

        await message.reply(
            "『        Display       』\n\n" +
            "『تم تسجيل بياناتك بنجاح ✅』\n\n" +
            "『استقبال  𝓚𝓲𝓷𝓰 𝓰𝓪𝓶𝓮𝓼』"
        );

        return true;
    }

    return true;
}

module.exports = {
    handleReception,
    isReceptionGroup,
    isAllowedCommand
};
