const { Monitor } = require("klasa");
const { Linter } = require("eslint");
const linter = new Linter();
const config = require("../assets/json/eslint.json");

const codeblock = /```(?:(\S+)\n)?\s*([^]+?)\s*```/i;

module.exports = class extends Monitor {
    constructor(...args) {
        super(...args, {
            enabled: true,
            ignoreBots: true,
            ignoreSelf: true,
            ignoreOthers: false,
            ignoreWebhooks: true,
            ignoreEdits: false
        });
    }

    async run(msg) {
        if (!codeblock.test(msg.content)) return;

        const {
            emotes: { tick, cross }
        } = this.client.constants;

        const parsed = codeblock.exec(msg.content);

        const code = {
            code: parsed[2],
            lang: parsed[1] ? parsed[1].toLowerCase() : null
        };

        if (code.lang && !["js", "javascript"].includes(code.lang)) return;
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
            return msg.react(tick);
        }
        else if(errors.length > 0) {
            return msg.react(cross);
        }
    }
};
