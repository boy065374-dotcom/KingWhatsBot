const groupLinks = require("./group_links");

const TEST_COMMANDS = [".تست", "!تست", "?تست"];

function handleCommand(message, botStatus = true) {
    // الأوامر مسموحة في الجروب الأساسي فقط
    if (message.from !== groupLinks.commandGroup) {
        return null;
    }

    const command = message.body.trim();

    // أمر تست
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
    handleCommand
};
