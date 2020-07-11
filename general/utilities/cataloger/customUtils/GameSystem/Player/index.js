let CONFIG = {};

class Player {
    constructor(config) {
        CONFIG = config;
        console.log("Hello World: Player", {config, CONFIG});
        this.name = config.name;

    }
}

module.exports = Player;
