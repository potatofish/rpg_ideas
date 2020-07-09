//*jshint node: true, esversion: 9*/
"use strict";

const System = require('System');
(async () => {
    let fiasco = new System("Fiasco");
    let session = fiasco.createSession();
    console.log({fiasco, session});
    

})();