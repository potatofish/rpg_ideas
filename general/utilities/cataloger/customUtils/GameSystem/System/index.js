let VALID_OPTION_KEYS = []
const Session = require('Session');

class System {
    constructor(options) {

        console.log({options});
        
        if (options && typeof options !== Object) { 
            const nameKey = "name"
            const nameObject = {}
            nameObject[nameKey] = options;
            VALID_OPTION_KEYS.push(nameKey);
            options = options ? nameObject : {};
        }
        console.log({options});


        const optionsInvoked = options ? Object.keys(options): [];

        console.log({optionsInvoked});

        optionsInvoked.forEach((key) => {
            if(!VALID_OPTION_KEYS.includes(key))
                throw "invalid options";
            this[key] = options[key];
        })
    }

    static init(keyArray) {
        if(keyArray) {
            if (Array.isArray(keyArray)) 
                {VALID_OPTION_KEYS.push(keyArray);}
            else {
                throw "arg keyArray is not array"
            }
        }

        console.log(VALID_OPTION_KEYS);
        let sys = new System();
        return sys;
        
    }

    createSession() {
        let session = new Session();
        return session;

    }
};
module.exports = System;

