const Attribute = require('./Attribute');

class CharacterClass extends Attribute {
    constructor(config) {
        console.log("Hello World: CharacterClass", config);

    }
}

module.exports = CharacterClass;
