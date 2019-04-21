const fetch = require("node-fetch");

class Util {
    
    static async postHastebin(url, msg) {
        const res = await fetch(`${url}/documents`, {
            method: "POST",
            body: msg
        }).then(res => res.json());

        return `${url}/${res.key}.js`;
    }

    static trimArray(arr, maxLen = 10) {
        if (arr.length > maxLen) {
            const len = arr.length - maxLen;
            arr = arr.slice(0, maxLen);
            arr.push(`${len} more...`);
        }
        return arr;
    }
}

module.exports = Util;
