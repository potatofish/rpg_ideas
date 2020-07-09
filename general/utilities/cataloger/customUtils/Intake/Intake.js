/*jshint node: true, esversion: 9*/
"use strict";
const csv = {parse: require("csv-parse")};
const fs = require('fs');

const FORMATS = {CSV : "csv"};


module.exports = class Intake {
    constructor() {

    }
    static get FORMATS() {return FORMATS;}


    static init(options) {
        return(async () => {
            let intake = new Intake();
            await intake.build(options);
            return intake;
        });
    }

    async build(options) {
        return;
    }

    static intake(format, options, processor) {
        let intake = "";
        console.log({format, options, processor});
    
        
        switch (format) {
            //TODO intake from csv
            case "csv":
                let sourceFile = { 
                    path : options[0],
                    format : options[1] !== undefined ? options[1] : "utf-8"
                };
                console.log(sourceFile);
                const sourceCSV = fs.readFileSync(sourceFile.path, sourceFile.format);
                return processor(sourceCSV);
            
            //TODO intake from variable (for argsv use)
            case "string":
                
                break;
            
            //TODO intake from looping user prompt for values
            case "prompt":
                
                break;
            default:
                break;
        }



         throw(intake);
    }
};

