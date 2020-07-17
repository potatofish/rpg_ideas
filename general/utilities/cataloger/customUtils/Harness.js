class Harness {
    constructor(configs, tests) {
        this._configs = configs;
        this._tests = tests;
    }

    run() {
        //run configs against all harnesses
        Object.keys(this._configs).forEach((configKey) => {
            const config = this._configs[configKey];
            this._tests.forEach((cb, idx) => {
                console.log(`**** Running ${cb.name} for config: "${configKey}" ****`);
                cb(config);
                console.log(`**** Ending ${cb.name} for config: "${configKey}" ****`);
            });
        });
    }
}
exports.Harness = Harness;
