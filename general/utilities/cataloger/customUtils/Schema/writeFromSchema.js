const fs = require("fs");
const util = require('util');
const { objectFromSchema } = require("./objectFromSchema");
const { loadJSONFile } = require("../loadJSONFile");


async function writeFromSchema(path, schema, values) {
    //console.log("PTAHT!", [path, schema, values]);

    const writeFile = util.promisify(fs.writeFile);
    const catalogEntry = objectFromSchema(schema, values);
    await writeFile(path, JSON.stringify(catalogEntry), 'utf8');


    return await loadJSONFile(path, () => { console.log("FILE [%s] MISSING!", path); });

}
exports.writeFromSchema = writeFromSchema;
