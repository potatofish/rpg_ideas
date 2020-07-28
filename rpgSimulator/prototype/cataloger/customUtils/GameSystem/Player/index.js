let CONFIG = {};

class Player {
    constructor(config) {
        if(typeof config === "string") {
            let name = config;
            config = {name};
        }
            
        CONFIG = config;
        console.log("Hello World: Player", {config, CONFIG});
        this.name = config.name;

    }
}

module.exports = Player;
