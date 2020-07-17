const { Harness } = require("../../../../Harness");

//Load all Harness Configs
const { harness01_CHARACTER_CONFIG } = require("./configDefinitions");
console.log({ harness01_CHARACTER_CONFIG });

// Load all Test Harnesses
let harnessTests = [];
const normalizedPath = require("path").join(__dirname, "harnesses");
require("fs").readdirSync(normalizedPath).forEach((file) => {
  const func = require("./harnesses/" + file);
  harnessTests = harnessTests.concat(Object.values(func));
});
console.log({harnessTests});


const aHarness = new Harness(harness01_CHARACTER_CONFIG, harnessTests);
aHarness.run();





