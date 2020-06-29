//*jshint node: true, esversion: 9*/
"use strict";


const fs = require("fs");
var Ajv = require('ajv');
const util = require('util');
const prompt = require('prompt');
const FileHistory = require('./customUtils/FileHistory.js');




const PATHS = { 
    SCHEMAS: { CATALOG: "./catalog.schema.json" }, 
    CATALOGS: { ROOT: "./catalogs.catalog.json" },
    CONFIG: {FILE_HISTORY: "./data/fileHistory.json"}
};

const rootCatalogFileDescription = {
    title: "Root Catalog",
    description: "A root catalog of all catalogs the catalogger is cataloging.", // I love this sentence
    path: PATHS.CATALOGS.ROOT

};

let historicalCatalogs = {maxHistory: 10, history: []};

function objectFromSchema({ properties }, values) {
    // load values into parameters as provided
    // more are ignored, fewer go to undefined
    console.log(properties);

    let object = {};
    console.log("KEYS:", Object.keys(properties));

    Object.keys(properties).forEach((element, index) => {
        console.log(properties[element]);
        console.log("value type:", typeof values[index]);

        // change to embedded function with return value that sets object[element]


        switch (properties[element].type) {
            case ("integer"):
                object[element] = parseInt(values[index]);
                break;
            case "number":
                object[element] = parseFloat(values[index]);
                break;
            case "string":
                object[element] = `${"values[index]"}`;
                break;
            case "object":
                object[element] = values[index];
                break;
            default:
                throw `Invalid JSON Schema Type ${properties[element].type}`;
        }

    });
    //console.log("OBJ:", object);


    return object;

}
async function writeFromObject(path, object) {
    const writeFile = util.promisify(fs.writeFile);
    return await writeFile(path, JSON.stringify(object), 'utf8');
}

async function writeFromSchema(path, schema, values) {

    //console.log("PTAHT!", [path, schema, values]);

    const writeFile = util.promisify(fs.writeFile);
    const catalogEntry = objectFromSchema(schema, values);
    await writeFile(path, JSON.stringify(catalogEntry), 'utf8');


    return await loadJSONConfigFile(PATHS.CATALOGS.ROOT, () => { console.log("CATALOG ROOT FILE [%s] MISSING!", PATHS.CATALOGS.ROOT) });

}
// revisit https://nodejs.org/api/util.html#util_util_promisify_original

/*
util.promisify takes a function following the common Node.js callback style, i.e. taking a (err, value) => … callback as the last argument, and returns a version that returns promises.

https://medium.com/@suyashmohan/util-promisify-in-node-js-v8-d07ef4ea8c53
*/

async function loadJSONConfigFile(path, onMissing) {
    const readFile = util.promisify(fs.readFile);
    let configString = undefined;

    await readFile(path, 'utf8')
        .then((text) => {
            configString = JSON.parse(text);
        })
        .catch((err) => {
            if (err.code === 'ENOENT') {
                console.log("File Missing");
                configString = onMissing();
            }
            else
                throw err
        });
    return configString;
}

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

async function promptInput(message, label, parser) {
    const promisedGet = util.promisify(prompt.get)
    
    prompt.start();
    prompt.message = `${message}\n`;
    let response = await promisedGet(label); 
    if  (parser) 
        response = parser(response);
    prompt.stop
    return response; 
};

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

    // load the catalogger file history catalog, creating it if it doesn't exit
    let fh = new FileHistory(10);
    const fhCatalog = await loadJSONConfigFile(PATHS.CONFIG.FILE_HISTORY, () => {
        console.log("No file history found");
        return undefined;
    });

    // 
    console.log(fhCatalog);
    if (fhCatalog) 
        fhCatalog.history.forEach((ele) => fh.updateHistory(ele));


    // dummy for testing - add files to history manually
    const pathPA = "/home/andre/development/rpg_ideas/pathfinder/editions/01_First_Edition/personalityArchetype.catalog.json";
    const pathpCC = "/home/andre/development/rpg_ideas/pathfinder/editions/01_First_Edition/playerCharacterClasses.catalog.json";
    fh.updateHistory(pathPA, () => {writeFromObject(PATHS.CONFIG.FILE_HISTORY, fh)});
    fh.updateHistory(pathpCC, () => {writeFromObject(PATHS.CONFIG.FILE_HISTORY, fh)});


    // prompt for schema path, or select recent from numbered list
    let promptMessage = "\nschema path, or select recent from numbered list";
    let separator = "-"
    promptMessage = `${separator.repeat(promptMessage.length)}\n${promptMessage}` 
     fh.getHistory().forEach((ele, idx) => {
        promptMessage = `${idx}: ${ele}\n${promptMessage}` 
    });

    const promptLabel = "path"
    const promptResponse = await promptInput(promptMessage, promptLabel, (response) => {
        let filePathChosen = (() => {
            const integerResponse = parseInt(response[promptLabel])
            if (isNaN(integerResponse)) {
                return response[promptLabel];
            }
            return fh.getHistory(integerResponse);
        })();


        fh.updateHistory(filePathChosen); 
        return {response: response[promptLabel], filePathChosen};
    });
    console.log(promptResponse);
    console.log(fh.getHistory());
    
    
    process.exit();
})();







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
