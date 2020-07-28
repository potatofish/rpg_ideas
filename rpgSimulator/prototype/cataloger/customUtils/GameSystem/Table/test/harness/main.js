//*jshint node: true, esversion: 9*/
"use strict";

const Table = require('Table');
const Player = require('Player');

const TABLE_CONFIG = {
    name: "New Table",
    occupancy: 5
};

const CHARCTER_CONFIG = {

};

function PLAYER_CONFIG(playerIndex) {
    return  {name: `Player#${playerIndex + 1}`};
};

async function harness(config) {
    let table = new Table(config);

    // fill the table with players
    for (let playersSat = 0; playersSat < table.occupancy; playersSat++) {
        table.sit(new Player(PLAYER_CONFIG(playersSat)),playersSat)   
    }

    console.log({table, players: table.players});
    table.players.forEach((val, idx, arr) => {
        console.log(val);
    });
};

harness(TABLE_CONFIG);
