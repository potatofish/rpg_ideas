//*jshint node: true, esversion: 9*/
"use strict";


const fs = require("fs");
var Ajv = require('ajv');
const util = require('util');
const prompt = require('prompt');
const FileHistory = require('./customUtils/FileHistory.js');
const { loadJSONFile } = require("./customUtils/loadJSONFile");
const { writeFromSchema } = require("./customUtils/Schema/writeFromSchema");
const { writeFromObject } = require("./customUtils/writeFromObject");
const { promptInput } = require("./customUtils/promptInput");




const PATHS = { 
    SCHEMAS: { CATALOG: "./catalog.schema.json" }, 
    CATALOGS: { ROOT: "./catalogs.catalog.json" },
    SETTINGS: {FILE_HISTORY: "./data/fileHistory.json"}
};
exports.PATHS = PATHS;

const rootCatalogFileDescription = {
    title: "Root Catalog",
    description: "A root catalog of all catalogs the catalogger is cataloging.", // I love this sentence
    path: PATHS.CATALOGS.ROOT

};

let historicalCatalogs = {maxHistory: 10, history: []};

/*
fs.open(path, 'r', (err, fd) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error('myfile does not exist');
        return;
      }
  
      throw err;
    }
  
    readMyData(fd);
  });

*/


/*/
function defineObject({title, description, properties}) {
    console.log({title, description, properties});
    return new Object()[title] = {description, properties};
    //return {`${title}`: {description, properties};
}

function initObject(object, fields) {

}

function add(catalog, object) {

}
*/

async function promptForTerm() {
    prompt.start();
    prompt.message ="";
    //console.log();
    prompt.get('term', function (err, result) {
      //
      // Log the results.
      //
      if (err) throw err;
      console.log(result.term)
    });
    prompt.stop
  }

//these can go async later to process both file reads at once
(async () => {

    // Load the schema that describes a catalog item
    const catalogSchema = await loadJSONConfigFile(PATHS.SCHEMAS.CATALOG, () => { console.log("CATALOG SCHEMA FILE [%s] MISSING!", PATHS.SCHEMAS.CATALOG) });
    console.log("Schema:", catalogSchema);

    // Load the root catalog (the catalog of catalogs, creating it if it doesn't exist)
    const rootCatalog = await loadJSONConfigFile(PATHS.CATALOGS.ROOT, () => {
        console.log(PATHS.CATALOGS.ROOT);

        return writeFromSchema(PATHS.CATALOGS.ROOT, catalogSchema, [0, rootCatalogFileDescription]);

    });
    console.log("RootCatalog:", rootCatalog);

    // load the catalogger file history from settings file, creating it if it doesn't exit
    const fhConfig = await loadJSONConfigFile(PATHS.SETTINGS.FILE_HISTORY, () => {
        console.log("No file history found");
        return undefined;
    })
    .catch((reason) => {
        console.log("Corrupted FileHistory: \n", reason);
        console.log("Rebuilding from default");
    });
    
    // 
    console.log(fhConfig);
    const fileHistory = await (async () => {
        if (fhConfig !== undefined) {
            let fh = new FileHistory(fhConfig.maxHistorySize);
            fhConfig.history.forEach((ele) => fh.updateHistory(ele));
            console.log({fh});
            
            return fh;
        }
        let fh = new FileHistory(10);
        console.log({fh});
        
        await writeFromObject(PATHS.SETTINGS.FILE_HISTORY, fh);
        return fh;
    })();


    // dummy for testing - add files to history manually
    const pathPA = "/home/andre/development/rpg_ideas/pathfinder/editions/01_First_Edition/personalityArchetype.catalog.json";
    const pathpCC = "/home/andre/development/rpg_ideas/pathfinder/editions/01_First_Edition/playerCharacterClasses.catalog.json";
    //fh.updateHistory(pathPA, () => {writeFromObject(PATHS.CONFIG.FILE_HISTORY, fh)});
    //fh.updateHistory(pathpCC, () => {writeFromObject(PATHS.CONFIG.FILE_HISTORY, fh)});


    console.log("FILEHISTORY:", fileHistory);
    
    // prompt for schema path, or select from numbered list
    let promptMessage = "\nschema path, or select recent from numbered list";
    let separator = "-"
    promptMessage = `${separator.repeat(promptMessage.length)}\n${promptMessage}` 
     fileHistory.getHistory().forEach((ele, idx) => {
        promptMessage = `${idx}: ${ele}\n${promptMessage}` 
    });

    const promptLabel = "path"
    const promptResponse = await promptInput(promptMessage, promptLabel, promptParse);
    console.log(promptResponse);
    console.log(fileHistory.getHistory());
    
    
    process.exit();
})();

async function promptParse(response) {
    let filePathChosen = (() => {
        const integerResponse = parseInt(response[promptLabel])
        if (isNaN(integerResponse)) {
            return response[promptLabel];
        }
        return fileHistory.getHistory(integerResponse);
    })();

    let loadedCatalog = await loadJSONConfigFile(filePathChosen,() => {return undefined;})

    if(loadedCatalog !== undefined){
        await fileHistory.updateHistory(filePathChosen, async () => {
            console.log(fileHistory);
            await writeFromObject(PATHS.SETTINGS.FILE_HISTORY, fileHistory)});
    }
    return {response: response[promptLabel], filePathChosen};
}





//const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
//const catalogSchema = JSON.parse(fs.readFileSync(PATHS.SCHEMAS.CATALOG, "utf8"));
//const anObject = new Object();
//const catalog = { id: 1, item: anObject };

//validateStuff();



//const catalog = defineObject(JSON.parse(catalogSchema));

//console.log("catalog:", catalog);




function validateStuf() {
    var ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: true}
    var validate = ajv.compile(catalogSchema);
    var valid = validate(catalogs);
    console.log(valid);

    if (!valid) { console.log(validate.errors); process.exit(1); }
}
