const { Client } = require("klasa");

const perms = require("../../utils/PermissionLevels");
const Constants = require("../../utils/Constants");
const config = require("../../config.json");

module.exports = class GresonClient extends Client {
    constructor() {
        super({
            fetchAllMembers: false,
            disabledEvents: ["TYPING_START", "CHANNEL_PINS_UPDATE"],
            permissionLevels: perms,
            prefix: "g.",
            regexPrefix: /^(((hey|yo),?\s*)?greson,?)\s*/i,
            providers: { default: "mongo" },
            commandEditing: true,
            pieceDefaults: {
                commands: { deletable: true, quotedStringSupport: true }
            },
            typing: true,
            readyMessage: client => `Logged in as ${client.user.tag}`,
            prefixCaseInsensitive: true,
            preserveSettings: false
        });

        this.constants = Constants;
        this.config = config;
    }

    login() {
        return super.login(this.config.bot.token);
    }
};
