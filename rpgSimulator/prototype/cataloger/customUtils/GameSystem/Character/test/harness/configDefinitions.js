// Primary Goal Post for initial testing:
// Players make Characters for a System during a Session
//Character Design Principles for testing
// #1 - Characters (config) is defined by System
// #2 - Characters are created by & belong to Players
// #3 - Characters are created during Sessions 
// #4 - Characters are related through Setting
// #1 - Characters (config) is defined by System
// -> A Character config inspired by Fiasco (a game System)
//console.log("****Config****");
console.log(this);

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
};
exports.harness01_CHARACTER_CONFIG = harness01_CHARACTER_CONFIG;
console.log(this);
