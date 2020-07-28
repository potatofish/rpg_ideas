//*jshint node: true, esversion: 9*/
"use strict";



const Schema = class {
    constructor(schema) {
        var Ajv = require('ajv');

        this.ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: true}
        this.validate = this.ajv.compile(schema);
        this.schema = schema;
    }

    static init(options) {
        return(async () => {
            let schema = new Schema(options);
            await schema.build();
            return schema;
        });
    }

    async build() {
        
    }

    toString() {
        return {schema: this.schema}
    }

    objectFromSchema(values) {

    // load values into parameters as provided
    // more are ignored, fewer go to undefined
    const properties = this.schema.properties;
    console.log(properties);

    let object = {};
    console.log("KEYS:", Object.keys(properties));

    Object.keys(properties).forEach((element, index) => {
        console.log(properties[element]);
        console.log("value type:", values && values[index] ? typeof values[index] : typeof values);

        // change to embedded function with return value that sets object[element]
        switch (properties[element].type) {
            case ("integer"):
                object[element] = values && values[index] ? parseInt(values[index]) : 0;
                break;
            case "number":
                object[element] = values && values[index] ? parseFloat(values[index]) : 0;
                break;
            case "string":
                object[element] = values && values[index] ? `${"values[index]"}` : "";
                break;
            case "object":
                object[element] = values && values[index] ? values[index] : {};
                break;
            default:
                throw `Invalid JSON Schema Type ${properties[element].type}`;
        }

    });
    //console.log("OBJ:", object);
    var valid = this.validate(object);
    //console.log(valid);
    if (!valid) { console.log(validate.errors); process.exit(1); }
    return object;

    }
};

module.exports = Schema;