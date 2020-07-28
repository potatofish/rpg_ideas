/*jshint node: true, esversion: 9*/
"use strict";


const PATHS = { 
    SCHEMAS: { CATALOG: "./config/catalog.schema.json" }, 

    CATALOGS: { ROOT: "./catalogs/root.catalog.json" },

    // paths files for storing working data
    DATA: {FILE_HISTORY: "./data/fileHistory.json"} 
};

const { writeFromObject } = require("../writeFromObject");
const FileHistory = require('../FileHistory.js');
const { loadJSONFile } = require("../loadJSONFile");
const { writeFromSchema } = require("../Schema/writeFromSchema");
const util = require('util');
const { promptInput } = require("../promptInput");
const Catalog = require('./Catalog.js');
const fs = require("fs");


const rootCatalogFileDescription = {
    title: "Root Catalog",
    description: "A root catalog of all catalogs the catalogger is cataloging. (aka This File.)", // I love this sentence
    path: PATHS.CATALOGS.ROOT

};

async function promptforPath(fileHistory) {
    console.log("FILEHISTORY:",  fileHistory);
    
    // prompt for schema path, or select from numbered list
    let promptMessage = "\nschema path, or select recent from numbered list";
    let separator = "-";
    promptMessage = `${separator.repeat(promptMessage.length)}\n${promptMessage}`;
    fileHistory.getHistory().forEach((ele, idx) => {
        promptMessage = `${idx}: ${ele}\n${promptMessage}` 
    });

    const promptLabel = "path";
    const promptResponse = await promptInput(promptMessage, promptLabel, validatePath);

    if(promptResponse === "") {
        //TODO open root catalog when there's an empty input
        return;
    }

    if(promptResponse.error !== undefined) {
        //TODO replace throw with display message and prompt for reprompting y/n
        throw promptResponse.error;
    }

    
    console.log(promptResponse);
    return promptResponse.filePathChosen;

}

async function validatePath({path}) {

    //TODO if path is undefined it's invalid
    if(path === undefined) {
        return {path, error: "Empty Path string"};
    }

    //TODO if path doesn't exist it's invalid
    const promisedAccess = util.promisify(fs.access)

    return path;
    let filePathChosen = (() => {
        const integerResponse = parseInt(response[promptLabel])
        if (isNaN(integerResponse)) {
            return response[promptLabel];
        }
        return fileHistory.getHistory(integerResponse);
    })();

    let loadedCatalog = await loadJSONFile(filePathChosen,() => {return undefined;})

    if(loadedCatalog !== undefined){
        await fileHistory.updateHistory(filePathChosen, async () => {
            console.log(fileHistory);
            await writeFromObject(PATHS.SETTINGS.FILE_HISTORY, fileHistory)});
    }
    return {response: response[promptLabel], filePathChosen};
}

//console.log([{loadJSONFile}, {writeFromSchema}]);


const Catalogger = class {
    constructor() {
        this.catalogSchema = undefined;
        this.rootCatalog = undefined;
        this.fileHistory = undefined;
    }
    
    static init() {
        return (async () => {
            let catalogger = new Catalogger();
            await catalogger.build();
            return catalogger;
        })();
    }

    async build() {
        // Load the schema that describes a catalog object
        this.catalogSchema = await loadJSONFile(PATHS.SCHEMAS.CATALOG, () => { 
            const error = 
                `CATALOG SCHEMA FILE [${PATHS.SCHEMAS.CATALOG}] MISSING!`;
            console.log("PROCESS:", process);
                
            throw error;
        });
        console.log("Schema:", this.catalogSchema);

        // Load the root catalog - the catalog of catalogs - from file
        // Create it if it doesn't exist 

        // TODO: Create catalogs folder that houses root if it doesn't exist
        this.rootCatalog = await loadJSONFile(PATHS.CATALOGS.ROOT, () => {
            console.log(PATHS.CATALOGS.ROOT);
            return writeFromSchema(PATHS.CATALOGS.ROOT, this.catalogSchema, [0, rootCatalogFileDescription]);

        });
        console.log("RootCatalog:", this.rootCatalog);

        // load the history of catalog files opened fromom settings file
        // leaving it undefined for recreation if it doesn't exist or is corrupt
        const fileHistoryRAW = await loadJSONFile(PATHS.DATA.FILE_HISTORY, () => {
            console.log("No file history found");
            return undefined;
        })
        .catch((reason) => {
            console.log("Corrupted file history: \n", reason);
            console.log("Rebuilding from default");
            return undefined;
        });
    
        // 
        console.log({fileHistoryRAW});
        //const fileHistory

        this.fileHistory = await (async () => {
            if (fileHistoryRAW !== undefined) {
                const {maxHistorySize, history} = fileHistoryRAW;
                let fh = new FileHistory(fileHistoryRAW);
                fileHistoryRAW.history.forEach((ele) => fh.updateHistory(ele));
                console.log({fh});
                
                return fh;
            }
            let fh = new FileHistory(10);
            console.log({fh});
            
            await writeFromObject(PATHS.DATA.FILE_HISTORY, fh);
            return fh;
        })();
    }

    async openCatalog(options) {
        return await (async () => {
            const path = (options !== undefined && options.path !== undefined) ? options.path : await promptforPath(this.fileHistory);

            return Catalog.init(path);
        })();
    }

}; 
module.exports = Catalogger;