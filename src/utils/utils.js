const fetch = require("node-fetch");

class Util {
    constructor(client) {
        this.client = client;
    }

    static async promptArgument(msg, args, propOrFn = "name") {
        let counter = 1;
        const m = await msg.prompt(`Found multiple matches:${codeBlock("", args.map((x) => `${counter++}: ${typeof propOrFn === "function" ? propOrFn(x) : x[propOrFn]}`).join("\n"))}\nType the number to choose an option or **CANCEL** to stop.`);
        if(m.content.toLowerCase() === "cancel") throw "Cancelled.";
        const num = parseInt(m.content);
        if(isNaN(num)) throw "Invalid input, Not a Number, cancelled";
        const res = args[num - 1];
        if(!res) throw "Invalid number range.";
        return res;
      }

    static async postHastebin(msg) {
        const res = await fetch("https://paste.ionadev.ml/documents" , {
            method: "POST",
            body: msg
        }).then(res => res.json());

        return `https://paste.ionadev.ml/${res.key}.js`;
    }
}

module.exports = Util;