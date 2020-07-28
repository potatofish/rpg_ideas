const { config } = require("mathjs");

let CONFIG = {};
let tableSeating = [];

class Table {
    constructor(config) {
        console.log("Hello World: Table", {config});
        CONFIG = config;

        this.CONFIG = {};
        this.seating = new Array(this.occupancy);
        console.log({seating: this.seating, length: this.seating.length});

        this.seating.forEach((val)=>{console.log({val});});
    }

    get occupancy() {return CONFIG.occupancy}

    sit(aPlayer, seat) {
        if(seat === undefined) {
            for (let index = 0; index < this.seating.length; index++) {
                const placeToSit = this.seating[index];
                if(seat === undefined && placeToSit === undefined) {
                    seat = index;
                    console.log({seat, placeToSit, index});
                }
            }
            this.seating.forEach(placeToSit => {
                //if(!seat && )
                //    seat = 
                
                console.log({placeToSit});
                //if(placetoSit === undefined) {
                //}
            });
            //seat = firstEmpty();
        }


        if(seat >= 0 & seat < this.seating.length) {
            if(this.seating[seat])
                throw "seat occupied"
            tableSeating[seat] = aPlayer;
            this.seating[seat] = aPlayer;
        }

        tableSeating.push(aPlayer) //TODO clean up old config
        //this.seating.push(aPlayer);
    }

    get players() {
        let players =  new Array(tableSeating);
        return  players;
    }
}

module.exports = Table;
