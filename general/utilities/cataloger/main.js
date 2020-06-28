//*jshint node: true, esversion: 9*/
"use strict";


const fs = require("fs");
var Ajv = require('ajv');
const util = require('util');




const PATHS = { SCHEMAS: { CATALOG: "./catalog.schema.json" }, CATALOGS: { ROOT: "./catalogs.catalog.json" } };
const rootCatalogFileDescription = {
    title: "Root Catalog",
    description: "A root catalog of all catalogs the catalogger is cataloging.", // I love this sentence
    path: PATHS.CATALOGS.ROOT

};


function objectFromSchema({properties}, values) {
    // load values into parameters as provided
    // more are ignored, fewer go to undefined
    console.log(properties);
    
    let object = {};
    console.log("KEYS:", Object.keys(properties));

    Object.keys(properties).forEach((element, index) => {
        console.log(properties[element]);
        console.log("value type:", typeof values[index]);

        switch (properties[element].type) {
            case ("integer" && Number.isInteger(values[index])):
                object[element] = new Number(values[index]);
                break;
            case "number":
                object[element] = new Number(values[index]);
            case "object":
                object[element] = values[index];
            case "string":
                object[element] = `${"values[index]"}`;
            default:
                throw "Invalid JSON Schema Type";
        }
        
    });
    
    return object;
    
}


async function writeFromSchema(path, schema, values) 
{
    
    //console.log("PTAHT!", [path, schema, values]);

    const writeFile = util.promisify(fs.writeFile);
    const catalogEntry = objectFromSchema(schema, values);
    //await writeFile(path, catalogEntry, 'utf8');


    return await loadJSONConfigFile(PATHS.CATALOGS.ROOT, () => { console.log("CATALOG ROOT FILE [%s] MISSING!", PATHS.CATALOGS.ROOT) });

}
// revisit https://nodejs.org/api/util.html#util_util_promisify_original

/*
util.promisify takes a function following the common Node.js callback style, i.e. taking a (err, value) => … callback as the last argument, and returns a version that returns promises.

https://medium.com/@suyashmohan/util-promisify-in-node-js-v8-d07ef4ea8c53
*/

async function loadJSONConfigFile(path, onMissing) {
    const readFile = util.promisify(fs.readFile);
    let configString =  undefined;
    
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

//these can go async later to process both file reads at once
(async () => {
    console.log("async begin");

    const catalogSchema = await loadJSONConfigFile(PATHS.SCHEMAS.CATALOG, () => { console.log("CATALOG SCHEMA FILE [%s] MISSING!", PATHS.SCHEMAS.CATALOG) });
    console.log(catalogSchema);

    const rootCatalog = await loadJSONConfigFile(PATHS.CATALOGS.ROOT, () => {
        console.log(PATHS.CATALOGS.ROOT);
        
        return writeFromSchema(PATHS.CATALOGS.ROOT, catalogSchema, [0, rootCatalogFileDescription]);
         
    });
    console.log(rootCatalog);
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
