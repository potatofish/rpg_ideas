const PATHS = { 
    SCHEMAS: { CATALOG: "./config/catalog.schema.json" }, 

    CATALOGS: { ROOT: "./catalogs/root.catalog.json" },

    // paths files for storing working data
    DATA: {FILE_HISTORY: "./data/fileHistory.json"} 
};

const { writeFromObject } = require("../writeFromObject");
const FileHistory = require('../FileHistory.js');
const { loadJSONFile } = require("../loadJSONFile");
const { writeFromSchema } = require("../Schema/writeFromSchema");

const rootCatalogFileDescription = {
    title: "Root Catalog",
    description: "A root catalog of all catalogs the catalogger is cataloging. (aka This File.)", // I love this sentence
    path: PATHS.CATALOGS.ROOT

};
//console.log([{loadJSONFile}, {writeFromSchema}]);


const Catalogger = class {
    constructor() {
        this.catalogSchema = undefined;
        this.rootCatalog = undefined;
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
        this.catalogSchema = await loadJSONFile(PATHS.SCHEMAS.CATALOG, () => { 
            const error = 
                `CATALOG SCHEMA FILE [${PATHS.SCHEMAS.CATALOG}] MISSING!`;
            console.log("PROCESS:", process);
                
            throw error;
        });
        console.log("Schema:", this.catalogSchema);

        // Load the root catalog - the catalog of catalogs - from file
        // Create it if it doesn't exist 

        // TODO: Create catalogs folder that houses root if it doesn't exist
        this.rootCatalog = await loadJSONFile(PATHS.CATALOGS.ROOT, () => {
            console.log(PATHS.CATALOGS.ROOT);
            return writeFromSchema(PATHS.CATALOGS.ROOT, this.catalogSchema, [0, rootCatalogFileDescription]);

        });
        console.log("RootCatalog:", this.rootCatalog);

        // load the history of catalog files opened fromom settings file
        // leaving it undefined for recreation if it doesn't exist or is corrupt
        const fileHistoryRAW = await loadJSONFile(PATHS.DATA.FILE_HISTORY, () => {
            console.log("No file history found");
            return undefined;
        })
        .catch((reason) => {
            console.log("Corrupted file history: \n", reason);
            console.log("Rebuilding from default");
            return undefined;
        });
    
        // 
        console.log({fileHistoryRAW});
        //const fileHistory

        const fileHistory = await (async () => {
            if (fileHistoryRAW !== undefined) {
                const {maxHistorySize, history} = fileHistoryRAW;
                let fh = new FileHistory(fileHistoryRAW);
                fileHistoryRAW.history.forEach((ele) => fh.updateHistory(ele));
                console.log({fh});
                
                return fh;
            }
            let fh = new FileHistory(10);
            console.log({fh});
            
            await writeFromObject(PATHS.DATA.FILE_HISTORY, fh);
            return fh;
        })();
    }
}; 
module.exports = Catalogger;