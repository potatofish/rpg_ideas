//*jshint node: true, esversion: 9*/
"use strict";

const CharacterClass = require('CharacterClass');

const characterClassConfig = {};


async function harness(config) {
    let characterClass = new CharacterClass(config);
};

harness(characterClassConfig);