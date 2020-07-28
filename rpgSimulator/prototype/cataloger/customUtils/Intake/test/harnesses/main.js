/*jshint node: true, esversion: 9*/
"use strict";

const Schema = require('Schema');
const Intake = require('Intake');
const fs = require('fs');

(async () => {
    console.log(require.main.path);
    
    const schemaPath = "./config/personalityArchetype.schema.json";
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
    console.log({schema});
    
    const testSchema = await Schema.init(schema)();

    //const schema = await testSchema.openCatalog();
    console.log(testSchema.objectFromSchema());

    const testIntake = new Intake();
    //console.log("%s", Intake);

    const csvDataPath = "./data/personalityArchetype.catalog.csv";
    console.log(Intake.intake(Intake.FORMATS.CSV, [csvDataPath], (res) =>{return res;}));

    
    
})();

