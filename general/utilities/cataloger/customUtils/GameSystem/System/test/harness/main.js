//*jshint node: true, esversion: 9*/
"use strict";

const System = require('System');
async function harness(systemConfig) {
    let system = new System(systemConfig);
    //system.phases = ["Act One", "The Tilt", "Act Two"]
    let session = system.createSession();
    console.log(session);
    
    console.log({system, session, flow: session.flow(system.phases)});
};


const fiascoConfig = {
    name: "Fiasco",
    session: {
        flow: {
            phases: ["Act One", "The Tilt", "Act Two"]
        }
    }
}

harness(fiascoConfig);