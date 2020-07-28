//*jshint node: true, esversion: 9*/
"use strict";

const System = require('System');
async function harness(systemConfig) {
    let system = new System(systemConfig);
    //system.phases = ["Act One", "The Tilt", "Act Two"]
    let session = system.createSession();
    //console.log(session);
    //session.__phases = "butt";
    console.log({system, session, flow: session.flow});
};


const fiascoCharacterTypeConfig = {
    template: "basic",
    attributes: {
        relationships: {
            previous: {
                references: "Table.previousPlayer(this).character",
                situation: [],
                details: {type: "", situtation: []}
            },
            next: {
                references: "Table.nextPlayer(this).character",
                situation: [],
                details: {type: "", situtation: []}
            }
        }
    },
    validation: [
        'attributes.Relationships.previous.references !== attributes.Relationships.next.references',
        '[Need, Object, Location].contains(attributes.Relationships.previous.details.type)',
        '[Need, Object, Location].contains(attributes.Relationships.next.details.type)'
    ]   
};

const fiascoConfig = {
    name: "Fiasco",
    session: {
        flow: {
            phases: ["Act One", "The Tilt", "Act Two"]
        },
        characters: {
            layout: "cicular",
            max: 5,
            template: "new"
        },
        validation: [
            'characters.max <= this.charcters.count',
            'flow.setup.done && [Need, Object, Location].countEach(Table.Characters.details) >= [1,1,1]'
        ]
    },
    characters: {
        types: [
            fiascoCharacterTypeConfig
        ] 
    }
}


harness(fiascoConfig);