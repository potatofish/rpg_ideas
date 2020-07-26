
Basic D&D is consists a series of systems describing the capabilities of characters. The systems cover defensive and offensive capabilities, spells to cast, skill at feats, etc. 

To simplify these things are subsumed into the matrixes and tables used for lookups.

Each matrix is unique, may have it's own unique rules for what it contains or which columns it contains.

```javascript

// Any D&D matrix is represented as a two dimensional array of data, usually lableld
const Matrix = class {
    constructor(data, headers, validation) {
        
        // Any matrix can be seeded with an array of data
        if !(Array.isArray(data))
            throw invalidFormat(notArray(data))

        // Any matrix can be seeded with an array of validations for the data
        this._validations = [];
        if validation {
            if !(Array.isArray(validation))
                throw invalidFormat(notArray(validation))

            // Any validations provided must have two elements 
            // the check function and some value to return as an error

            // All valid check/error combinations are added to _validations
            validation.foreach((rowV) => {
                if !(Array.isArray(rowV)) || rowV.length != 2
                    throw invalidFormat(notArray(rowV))

                if !(validation[0] typeOf Function)
                    throw invalidFormat(notFunction(validation[0]))

                this._validations.push(check: validation[0], error: validation[1])
            }
        })

        // Matrixes will be seeded with data that has a header row of data
        // This row is an array of values representing columns
        // Each subsequent row has a property repsenting the value under the relevant column
        this._properties = undefined;
        
        if headers {
            let propertyList = data.shift()
            if !(Array.isArray(propertyList))
                throw invalidFormat(notArray(propertyList))
            this._properties = propertyList;
        }

        data.foreach((rowD, indexD) => {
            if !(Array.isArray(rowD))
                throw invalidFormat(notArray(rowD))

            if this._properties.length > 0 && this._properties.length != rowD.length
                throw invalidFormat(lengthMismatch(headers, rowD))

            this.validations.forEach((validation) => {
                if !(validation.check(rowD))
                    validation.throw(rowD)
            })

            if ! this._properties.length  {
                this._data.push(rowD)
            } else {
                this._data.push(map(this._properties, rowD))
            }

        })
    }
}
```