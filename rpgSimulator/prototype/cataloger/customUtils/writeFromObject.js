const fs = require("fs");
const util = require('util');

async function writeFromObject(path, object) {
    const writeFile = util.promisify(fs.writeFile);
    let promised = await writeFile(path, JSON.stringify(object), 'utf8');
    console.log({ promised });

    return promised;
}
exports.writeFromObject = writeFromObject;
