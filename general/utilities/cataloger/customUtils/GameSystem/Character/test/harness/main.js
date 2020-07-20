const path = require("path");
const fs = require("fs");
const { Harness } = require("../../../../Harness");

//Read & parse all Test Harness Configs (JSON)
const configsPath = path.join(__dirname, "configs");
let testHarnessConfigs = {};
const jsonExtName = ".json";
const utf8Encoding = "utf-8";
fs.readdirSync(configsPath).forEach((file) => {
    if(path.extname(file) === jsonExtName) {
      const testConfigName = path.basename(file,jsonExtName)
      const testConfigJSON = require(path.join(configsPath, file));
      const testConfig = Object.fromEntries([[testConfigName, testConfigJSON]]);
      Object.assign(testHarnessConfigs, testConfig)
    }
});
console.log({testHarnessConfigs});

// Require all Test Harness Cases
let testHarnessCases = {};
const casesPath = path.join(__dirname, "cases");
fs.readdirSync(casesPath).forEach((file) => {
  const testCase = require(path.join(casesPath, file));
  Object.assign(testHarnessCases,testCase)
});
console.log({testHarnessCases});

// Run all parsed configs against all required cases
(new Harness(testHarnessConfigs, testHarnessCases)).run();




