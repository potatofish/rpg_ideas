class Harness {
    constructor(configs, tests) {
        this._configs = configs;
        this._tests = tests;
    }

    run() {
        //run configs against all harnesses
        Object.keys(this._configs).forEach((configKey) => {
            const config = this._configs[configKey];
            Object.keys(this._tests).forEach((cbKey) => {
                const testCase = this._tests[cbKey]
                console.log(`**** Running ${cbKey} for config: "${configKey}" ****`);
                testCase(config);
                console.log(`**** Ending ${cbKey} for config: "${configKey}" ****`);
            });
        });
    }
}
exports.Harness = Harness;
