const {
    util: { codeBlock }
} = require("klasa");

module.exports = class ArgumentUtils {
    static async promptArgument(msg, args, propOrFn = "name") {
        let counter = 1;
        const m = await msg.prompt(
            `Found multiple matches:${codeBlock(
                "",
                args
                    .map(
                        x =>
                            `${counter++}: ${
                                typeof propOrFn === "function"
                                    ? propOrFn(x)
                                    : x[propOrFn]
                            }`
                    )
                    .join("\n")
            )}\nType the number to choose an option or **CANCEL** to stop.`
        );
        if (m.content.toLowerCase() === "cancel") throw "Cancelled.";
        const num = parseInt(m.content);
        if (isNaN(num)) throw "Invalid input, Not a Number, cancelled";
        const res = args[num - 1];
        if (!res) throw "Invalid number range.";
        return res;
    }
};
