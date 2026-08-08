const PREFIXES = [".", "!", "؟"];

function handleCommand(message) {
    const text = message.trim();

    const prefix = PREFIXES.find(p => text.startsWith(p));

    if (!prefix) {
        return null;
    }

    const command = text
        .slice(prefix.length)
        .trim()
        .toLowerCase();

    switch (command) {
        case "تست":
            return "انا تمام يسطا كمل كمل 😎";

        default:
            return null;
    }
}

module.exports = {
    handleCommand
};
