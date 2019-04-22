/* eslint-disable no-console */
const express = require("express");
const bodyParser = require("body-parser");
const { WebhookClient, MessageEmbed } = require("discord.js");
const config = require("./config.json");
const app = express();
const cmd = require("node-cmd");
const crypto = require("crypto"); // pre-installed node package

const webhook = new WebhookClient(...config.webhook.git);

app.use(bodyParser.json());

app.post("/git", (req, res) => {
    const hmac = crypto.createHmac("sha1", process.env.SECRET);
    const sig = "sha1=" + hmac.update(JSON.stringify(req.body)).digest("hex");
    if (
        req.headers["x-github-event"] == "push" &&
        sig == req.headers["x-hub-signature"]
    ) {
        cmd.run("cd src && chmod 777 git.sh");
        cmd.get("cd src && ./git.sh", (err, data) => {
            if (data) console.log(data);
            if (err) console.log(err);
        });
        cmd.run("refresh"); // Refresh project
        const commits =
            req.body.head_commit.message.split("\n").length == 1
                ? req.body.head_commit.message
                : req.body.head_commit.message
                    .split("\n")
                    .map((el, i) =>
                        i !== 0 ? "                       " + el : el
                    )
                    .join("\n");
        console.log(
            "> [GIT] Updated with origin/master\n" +
                `        Latest commit: ${commits}`
        );

        const embed = new MessageEmbed()
            .setDescription(
                "> [GIT] Updated with origin/master\n" +
                    `        Latest commit: ${commits}`)
            //.addField("Latest Commit", commits)
            .setColor("AQUA")
            .setTimestamp();

        webhook.send(embed);
    }
    return res.sendStatus(200);
});

app.listen(3000, () => console.log("Express!"));
