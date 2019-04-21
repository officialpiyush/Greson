const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            runIn: ["text"],
            autoAliases: true,
            bucket: 1,
            cooldown: 0,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: "Disable A Channel From Auto Lining!",
            extendedHelp: "No extended help available.",
            usage: "<channel:channelname>",
            usageDelim: " ",
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(msg, [channel]) {
        
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }
};
