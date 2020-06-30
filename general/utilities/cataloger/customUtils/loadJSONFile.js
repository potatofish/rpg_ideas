const fs = require("fs");
const util = require('util');
// revisit https://nodejs.org/api/util.html#util_util_promisify_original
/*
util.promisify takes a function following the common Node.js callback style, i.e. taking a (err, value) => … callback as the last argument, and returns a version that returns promises.

https://medium.com/@suyashmohan/util-promisify-in-node-js-v8-d07ef4ea8c53
*/
async function loadJSONFile(path, onMissing) {
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
                throw err;
        });
    return configString;
}
exports.loadJSONFile = loadJSONFile;
