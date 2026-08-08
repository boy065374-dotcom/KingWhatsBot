const groupLinks = require("./group_links");

const ALLOWED_COMMANDS = [".تست", "!تست", "?تست"];

function isReceptionGroup(message) {
    return message.from === groupLinks.receptionGroup;
}

function isCommandAllowed(message) {
    const text = message.body.trim();

    if (!isReceptionGroup(message)) {
        return true;
    }

    return ALLOWED_COMMANDS.some(command => text.startsWith(command));
}

async function handleReception(message) {
    if (!isReceptionGroup(message)) {
        return false;
    }

    if (!isCommandAllowed(message)) {
        return true;
    }

    // نظام الاستقبال هنضيفه هنا في الخطوة التالية.
    return false;
}

module.exports = {
    isReceptionGroup,
    isCommandAllowed,
    handleReception
};
