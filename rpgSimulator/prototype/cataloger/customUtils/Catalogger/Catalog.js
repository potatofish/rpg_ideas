/*jshint node: true, esversion: 9*/
"use strict";

const Catalog = class {
    constructor(options) {
        this.items = {}
    }

    addItem(item) {
        const newEntry = {
            id: Object.keys(this.items).length + 1,
            item
        }
        Object.assign(this.items, newEntry);
    }

    static init(options) {
        return(async () => {
            let catalog = new Catalog();
            await catalog.build();
            return catalog;
        });
    }

    async build() {
        
    }
};

module.exports = Catalog;