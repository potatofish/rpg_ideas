const Catalogger = class {
    constructor() {
        this.catalogScema = await loadJSONConfigFile(PATHS.SCHEMAS.CATALOG, () => { console.log("CATALOG SCHEMA FILE [%s] MISSING!", PATHS.SCHEMAS.CATALOG) });
    }
}; 
module.exports = Catalogger;