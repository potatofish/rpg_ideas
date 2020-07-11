//*jshint node: true, esversion: 9*/
"use strict";

const Player = require('Player');

const PLAYER_CONFIG = {
    name: "Joel Derty"
};

async function harness(config) {
    let player = new Player(config);
};

harness(PLAYER_CONFIG);