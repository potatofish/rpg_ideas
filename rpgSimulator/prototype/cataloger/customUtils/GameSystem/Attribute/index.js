
//*jshint node: true, esversion: 9*/
"use strict";

//Attributes are representations of areas where a game element is 
//proficient (or deficient) 

const Attribute  = class {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

module.exports = Attribute;

