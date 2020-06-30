const PATHS = { 
    SCHEMAS: { CATALOG: "./catalog.schema.json" }, 
    CATALOGS: { ROOT: "./catalogs.catalog.json" },
    SETTINGS: {FILE_HISTORY: "./data/fileHistory.json"}
};

const { loadJSONFile } = require("../loadJSONFile");


const Catalogger = class {
    constructor() {
    }
    
    static init() {
        return (async () => {
            let catalogger = new Catalogger();
            await catalogger.build();
            return catalogger;
        })();
    }

    async build() {
        // Load the schema that describes a catalog object
        const catalogSchema = await loadJSONFile(PATHS.SCHEMAS.CATALOG, () => { 
            const error = 
                `CATALOG SCHEMA FILE [${PATHS.SCHEMAS.CATALOG}] MISSING!`;
            console.log("PROCESS:", process);
                
            throw error;
        });
        console.log("Schema:", catalogSchema);
    }
}; 
module.exports = Catalogger;