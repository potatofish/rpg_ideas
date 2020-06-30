function objectFromSchema({ properties }, values) {
    // load values into parameters as provided
    // more are ignored, fewer go to undefined
    console.log(properties);

    let object = {};
    console.log("KEYS:", Object.keys(properties));

    Object.keys(properties).forEach((element, index) => {
        console.log(properties[element]);
        console.log("value type:", typeof values[index]);

        // change to embedded function with return value that sets object[element]
        switch (properties[element].type) {
            case ("integer"):
                object[element] = parseInt(values[index]);
                break;
            case "number":
                object[element] = parseFloat(values[index]);
                break;
            case "string":
                object[element] = `${"values[index]"}`;
                break;
            case "object":
                object[element] = values[index];
                break;
            default:
                throw `Invalid JSON Schema Type ${properties[element].type}`;
        }

    });
    //console.log("OBJ:", object);
    return object;

}
exports.objectFromSchema = objectFromSchema;
