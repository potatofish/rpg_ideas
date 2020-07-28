const Schema = require('Schema');
const fs = require('fs');

(async () => {
    console.log(require.main.path);
    

    //TODO test $ref
    const schemaPath = "./config/catalog.schema.json";
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
    console.log({schema});
    
    const testSchema = await Schema.init(schema)();

    //const schema = await testSchema.openCatalog();
    console.log(testSchema.objectFromSchema());
    
})();

