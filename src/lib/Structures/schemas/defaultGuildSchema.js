const { KlasaClient } = require("klasa");

module.exports = KlasaClient.defaultGuildSchema
    .add("lint" ,  folder => folder
        .add("dc" , "string" , { array: true, configurable: false })
    );