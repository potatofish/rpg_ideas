const util = require('util');
const { harnessConfigTests } = require("./main");
const { harness01_CHARACTER_CONFIG } = require("./configDefinitions");

//run configs against all harnesses
Object.keys(harness01_CHARACTER_CONFIG).forEach((configKey) => {
    const config = harness01_CHARACTER_CONFIG[configKey];
    harnessConfigTests.forEach((cb, idx) => {
        (async () => {
            const promisedCB = util.promisify(cb);
            console.log(`**** Running ${cb.name} for config: "${configKey}" ****`);
            await promisedCB(config);
            console.log(`**** Ending ${cb.name} for config: "${configKey}" ****`);
        })();
    });
});
