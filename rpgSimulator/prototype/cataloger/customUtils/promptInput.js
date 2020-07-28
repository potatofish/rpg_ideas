const util = require('util');
const prompt = require('prompt');

async function promptInput(message, label, parser) {
    const promisedGet = util.promisify(prompt.get);

    prompt.start();
    prompt.message = `${message}\n`;
    let response = await promisedGet(label);
    if (parser !== undefined)
        response = parser(response);
    prompt.stop();
    return response;
}
exports.promptInput = promptInput;
;
