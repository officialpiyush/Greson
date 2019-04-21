const { Command } = require("klasa");
const { Linter } = require("eslint");
const linter = new Linter();
const { stripIndents } = require("common-tags");
const { trimArray } = require("../../utils/utils");
const config = require("../../assets/json/eslint.json");
const goodMessages = require("../../assets/json/good.json");
const badMessages = require("../../assets/json/bad.json");

const codeblock = /```(?:(\S+)\n)?\s*([^]+?)\s*```/i;

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ["text", "dm"],
            aliases: ["code"],
            autoAliases: true,
            bucket: 1,
            cooldown: 0,
            promptLimit: 0,
            promptTime: 30000,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: "Lint Your Javascript Code!",
            extendedHelp: "No extended help available.",
            usage: "<mes:str>[...]",
            usageDelim: " ",
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(msg, [...mes]) {
        if (!codeblock.test(mes)) return;
        mes = mes.join(" ");
        const {
            emotes: { tick, cross }
        } = this.client.constants;

        const parsed = codeblock.exec(mes);
        const code = {
            code: parsed[2],
            lang: parsed[1] ? parsed[1].toLowerCase() : null
        };

        if (code.lang && !["js", "javascript"].includes(code.lang)) {
            return msg.reply(
                "Only `js` or `javascript` codeblocks should be linted with this command."
            );
        }
        const errors = linter.verify(code.code, config);
        if (
            msg.reactions.has(cross) &&
            msg.reactions.get(cross).users.has(this.client.user.id)
        ) {
            await msg.reactions.get(cross).users.remove(this.client.user);
        }
        if (
            msg.reactions.has(tick) &&
            msg.reactions.get(tick).users.has(this.client.user.id)
        ) {
            await msg.reactions.get(tick).users.remove(this.client.user);
        }

        if (!errors.length) {
            return msg.reply(
                goodMessages[Math.floor(Math.random() * goodMessages.length)]
            );
        }
        const errorMap = trimArray(
            errors.map(err => `\`[${err.line}:${err.column}] ${err.message}\``)
        );
        return msg.reply(stripIndents`
			${badMessages[Math.floor(Math.random() * badMessages.length)]}
			${errorMap.join("\n")}
		`);
    }
};
