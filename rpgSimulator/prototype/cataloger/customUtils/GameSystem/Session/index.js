const Table = require("../Table");
const Character = require("../Character");

function validateConstrutorOptions(options) {
    //if(!options || !options.flow || !options.flow.phases) throw "bad";
    //console.log({Map: new Map([[!options, "bad"]])});

    const VALIDATION_OPTIONS = [
        [!options, ()=>{return "argument options is not defined";}],
        [!options.flow, ()=>{return "argument options.flow is not defined";}],
        [!options.flow.phases, ()=>{return "argument options.flow.phases is not defined";}]
    ];


    
    const validationMap = new Map(VALIDATION_OPTIONS);
    console.log({VALIDATION_OPTIONS, validationMap });
    for (const [key, value] of validationMap) {
        console.log([key, value]);
        if(key) throw value();
    }
    
}

// TODO encapsulate that characters are a function of a session, but can also be added to a session from external
class Session {
    constructor(options) {
        validateConstrutorOptions(options)
        
        this.CONFIG = {};
        this.CONFIG.phases = options.flow.phases;
        this.CONFIG.characters = options.characters;
        this.table = new Table(options.table)
        this.table.characters = [];
        
    }

    get flow() {
        return {
            setup: {}, 
            phases: this.CONFIG.phases, 
            shutdown: {}
        };
        
    }

    joinWithCharacter(aCharacter) {
        this.table.characters.push(aCharacter);
    }

    joinWithPlayer(aPlayer) {
        this.table.sit(aPlayer);
        const playerCharacter = Character.init(aPlayer);
        this.table.characters.push(playerCharacter);
        return playerCharacter;
    }

    characters(aPlayer) {
        console.log("characters");
        if (aPlayer === undefined)
            return this.table.characters;
        return [];
    }
}

module.exports = Session;
