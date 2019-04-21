const { PermissionLevels } = require("klasa");

module.exports = new PermissionLevels()
    .add(0, () => true)
    .add(
        4,
        message =>
            message.guild && message.member.permissions.has("MANAGE_MESSAGES"),
        { fetch: true }
    )
    .add(
        5,
        message =>
            message.guild &&
      (message.member.permissions.has("BAN_MEMBERS") &&
        message.member.permissions.has("KICK_MEMBERS")),
        { fetch: true }
    )
    .add(
        6,
        message => message.guild && message.member.permissions.has("MANAGE_GUILD"),
        { fetch: true }
    )
    .add(
        7,
        message => message.guild && message.member.permissions.has("ADMINISTRATOR"),
        { fetch: true }
    )
    .add(8, message => message.guild && message.member === message.guild.owner, {
        fetch: true
    })
    .add(9, ({ author, client }) => author === client.owner, { break: true })
    .add(10, ({ author, client }) => author === client.owner);
