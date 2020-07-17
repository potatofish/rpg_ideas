const Character = require('Character');
const Player = require('../../../../Player');
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
    ];

    //console.log({ PCA: playerCharacter.attributes(), keys: Object.keys(playerCharacter.attributes()) });
    //let pcA = playerCharacter.attributes();
    //pcA.every((attr) => { return config.attributes.includes(attr); });
    HARNESS_VALIDATIONS.forEach(check => {
        //console.log({eval: eval(check.condition)});
        if (!eval(check.condition)) {
            let error = new Error(check.msg);
            error.player = player;
            error.PC = playerCharacter;
            //console.log({error});
            throw error;
        }
    });

}
exports.CREATE_BY_PLAYER = CREATE_BY_PLAYER;
;
