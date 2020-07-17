const Character = require('Character');
const Attribute = require('../../../Attribute')
const Player = require('../../../Player');
const util = require('util');


const harnessConfigTests = [

];

// Primary Goal Post for initial testing:
// Players make Characters for a System during a Session

//Character Design Principles for testing
// #1 - Characters (config) is defined by System
// #2 - Characters are created by & belong to Players
// #3 - Characters are created during Sessions 
// #4 - Characters are related through Setting

// #1 - Characters (config) is defined by System
// -> A Character config inspired by Fiasco (a game System)
const harness01_CHARACTER_CONFIG = {
    FIASCO: {
        name: "",
        template: "",
        attributes: [],
        validation: []
    },
    // -> 
    "D&D": {
        name: "Classic D&D Charaacter",
        template: "",
        attributes: ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"],
        validation: []
    }
}
// #2 - Characters are created by & belong to Players
// -> create a Player object
// -> create a Character for that Player
// -> validate the Character made:
//    => is type correct
//    => does Character.player match Player
//    => does Character.config match the one specified
//        ~> does the name match?
//        ~> do the attribute names match
async function CREATE_BY_PLAYER(config) {
    const player = new Player("A TestPlayer");
    const playerCharacter = Character.init(player, config);
    const HARNESS_VALIDATIONS = [
        { condition: "playerCharacter instanceof Character", msg: "Character was not initialized into new object" },
        { condition: "typeof playerCharacter === \"object\"", msg: "Character is not an object" },
        { condition: "playerCharacter.player === player", msg: "Players don't match" },
        { condition: "playerCharacter.name === config.name", msg: "Character names don't match" },
        { condition: "playerCharacter.attributes().every((attr) => {return config.attributes.includes(attr);})", msg: "Attributes don't match" }
    ]

    //console.log({ PCA: playerCharacter.attributes(), keys: Object.keys(playerCharacter.attributes()) });

    //let pcA = playerCharacter.attributes();
    //pcA.every((attr) => { return config.attributes.includes(attr); });


    HARNESS_VALIDATIONS.forEach(check => {
        //console.log({eval: eval(check.condition)});
        if (!eval(check.condition)) {
            let error = new Error(check.msg)
            error.player = player;
            error.PC = playerCharacter;
            //console.log({error});
            throw error;
        }
    });

};
harnessConfigTests.push(CREATE_BY_PLAYER);

// #3 - Characters are created during Sessions 
async function CREATE_DURING_SESSION(config, cb) {
    if(cb !== undefined)
        return cb();
};
harnessConfigTests.push(CREATE_DURING_SESSION);



// #4 - Characters are related through Setting
async function CHECK_RELATIONS(config, cb) {
    if(cb !== undefined)
        return cb();

};
harnessConfigTests.push(CHECK_RELATIONS);



//run configs against all harnesses
Object.keys(harness01_CHARACTER_CONFIG).forEach((configKey) =>{
    const config = harness01_CHARACTER_CONFIG[configKey];
    harnessConfigTests.forEach((cb,idx) => { 
        (async() => {
            const promisedCB = util.promisify(cb);
            console.log(`**** Running ${cb.name} for config: "${configKey}" ****`);
            await promisedCB(config);
            console.log(`**** Ending ${cb.name} for config: "${configKey}" ****`);
        })();
    });
});

//harness02_CREATE_BY_PLAYER(harness01_CHARACTER_CONFIG.FIASCO);

//harness02_CREATE_BY_PLAYER(harness01_CHARACTER_CONFIG["D&D"]);


