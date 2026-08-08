const groupLinks = require("./group_links");

const ALLOWED_COMMANDS = [
    ".تست",
    "!تست",
    "?تست"
];

function isReceptionGroup(message) {
    return message.from === groupLinks.receptionGroup;
}

function isAllowedCommand(message) {
    const text = message.body.trim();

    return ALLOWED_COMMANDS.some(command => {
        return text === command || text.startsWith(command + " ");
    });
}

function canUseCommand(message) {
    // خارج جروب الاستقبال: الأوامر مسموحة
    if (!isReceptionGroup(message)) {
        return true;
    }

    // داخل جروب الاستقبال: فقط أوامر الاختبار
    return isAllowedCommand(message);
}

async function handleReception(message) {
    if (!isReceptionGroup(message)) {
        return false;
    }

    // أي أمر غير مسموح في جروب الاستقبال يتم تجاهله
    if (message.body.trim().startsWith(".") ||
        message.body.trim().startsWith("!") ||
        message.body.trim().startsWith("?")) {

        if (!isAllowedCommand(message)) {
            return true;
        }
    }

    // نظام الاستقبال نفسه هنضيفه هنا
    return false;
}

module.exports = {
    isReceptionGroup,
    isAllowedCommand,
    canUseCommand,
    handleReception
};
