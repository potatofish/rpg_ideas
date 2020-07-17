const Attribute = require("../Attribute");
const Player = require("../Player");


const Character = class {
    constructor(player, name, attributes){
        this.name = name;
        this.player = player;
        this.attributeArray = [];
        console.log({attributes});

        if (attributes !== undefined) {
            attributes.forEach(element => {
                if (typeof element === "string")  {
                    const elementAttribute = new Attribute(element, 0)
                    this.attributeArray.push(elementAttribute)
                    return;
                }

                if (element instanceof Attribute) {
                    this.attributeArray.push(element)
                    return;
                }
            });
        }

        console.log({AA: this.attributeArray});
    }

    static init(player, systemConfig) {
        if(!(player instanceof Player))
            throw "player is not Player object"
        let {name, attributes} = systemConfig;

        name = name !== undefined ? name : "character_name" ;
        attributes = attributes !== undefined ? attributes : [];

        console.log({systemConfig, name, attributes});
        return new Character(player, name, attributes);
    }

    attributes() {
        console.log(this.attributeArray);
        let attributeList = [];
        this.attributeArray.forEach(anAttribute => {
            attributeList.push(anAttribute.name);
        });
        return attributeList;
    }
};

module.exports = Character;