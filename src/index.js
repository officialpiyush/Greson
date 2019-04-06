const {Client} = require("klasa");

new Client({
    fetchAllMembers: false,
    prefix: '+',
    commandEditing: true,
    typing: true,
    readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
}).login("NDk5MTI2MzY4NDk2NTE3MTI1.XKiRfQ.dvH3cswUyzfu1at7IwKgMbXW1t0");