const Attribute = require("../Attribute/test/harness/node_modules/Attribute");

const Character = class {
    constructor(name, attributes){
        this.name = name;
        if (attributes !== undefined) {
            attributes.forEach(element => {
                console.log(typeof element);
            });
            this.attributes = attributes;
        } 
        else 
            this.attributes = [];
    }

    static init(system) {
        return new Character("playersName", system === undefined ? system : system.attributes);
    }
};

module.exports = Character;