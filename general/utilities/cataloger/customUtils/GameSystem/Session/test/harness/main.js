//*jshint node: true, esversion: 9*/
"use strict";

const Session = require('Session');
const Player = require('Player');

const SESSION_CONFIG =  {
    flow: {
        phases: ["Act One", "The Tilt", "Act Two"]
    },
    table: {
        occupancy: 5,
        layout: "cicular"
    },
    characters: {
        template: "new"
    },
    validation: [
        'this.CONFIG.table.occupancy <= this.characters.size',
        'flow.setup.done && [Need, Object, Location].countEach(Table.Characters.details) >= [1,1,1]'
    ]
};

function PLAYER_CONFIG(playerIndex) {
    return  {name: `Player#${playerIndex + 1}`};
};

async function harness(config) {
    let session = new Session(config);

    // fill the table with players
    for (let playersSat = 0; playersSat < session.table.occupancy; playersSat++) {
        session.joinWithPlayer(new Player(PLAYER_CONFIG(playersSat)),playersSat)   
    }

    //session.createCharacter(session.table)

    console.log({table: session.table.seating});
    
};

harness(SESSION_CONFIG);