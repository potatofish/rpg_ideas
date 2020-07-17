//*jshint node: true, esversion: 9*/
"use strict";

const Session = require('Session');
const Player = require('Player');
const Character = require('../../../Character');

// Primary Goal Post for initial testing:
// Players make Characters for a System during a Session

// A Character config inspired by Fiasco

// Session Design Principles:
// - Sessions are divided into a flow of Phases
// - Sessions are defined by their System
// - Sessions are joined by Players, who then are assigned Characters
// - Sessions are played at a Table (more generically a platform)

// - Systems may define different types of Sessions
// - Sessions may allow for Players to import Characters of the same System
// - Sessions may allow for Players to modify Characters
// - Sessions may limit actions based on the current Phase of play
// - Sessions may limit joining if there's no occupancy at the table



const SESSION_CONFIG =  {
    flow: {
        phases: ["Act One", "The Tilt", "Act Two"]
    },
    table: {
        occupancy: {
            size: 5, 
            type: "Character"
        },
        layout: "cicular"
    },
    characters: {
        template: "new"
    },
};

function PLAYER_CONFIG(playerIndex) {
    return  {name: `Player#${playerIndex + 1}`};
};


async function harness(config) {
    let session = new Session(config);
    let characters = [];

    // fill the table with 
    for (let playersSat = 0; playersSat < session.table.occupancy.size; playersSat++) {
        const OccupancyType = session.table.occupancy.type

        const player = new Player(PLAYER_CONFIG(playersSat))
        let newCharacter = {};
        
        switch (OccupancyType) {
            case "Character":
                newCharacter = Character.init(player);
                session.joinWithCharacter(newCharacter);
                break;
            case "Player":
                newCharacter = session.joinWithPlayer(player,playersSat)   
                break;
            default:
                throw "let junk is fun"
                break;
        }
        characters.push(newCharacter);


 
    }

    console.log({characters});


    //session.createCharacter(session.table)
    const table = session.table.seating;

    console.log({table});

    const sessionCharacters = session.characters();
    

    console.log({sessionCharacters});

};

harness(SESSION_CONFIG);