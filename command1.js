const groupLinks = require("./group_links");

const TEST_COMMANDS = [".تست", "!تست", "?تست"];

function handleReceptionCommand(message, botStatus) {
    // السماح لجروب الاستقبال فقط
    if (message.from !== groupLinks.receptionGroup) {
        return null;
    }

    const command = message.body.trim();

    // أمر تست فقط
    if (TEST_COMMANDS.includes(command)) {
        if (botStatus === true) {
            return "انا تمام يسطا كمل كمل";
        } else {
            return "البوت مش تمام، ابحث عن المشكلة";
        }
    }

    return null;
}

module.exports = {
    handleReceptionCommand
};
