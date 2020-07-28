let VALID_OPTION_KEYS = ["name", "session", "characters"];

const Session = require('Session');

class System {
    constructor(systemConfig) {

        console.log([{systemConfig}, typeof session]);
        
        if (systemConfig && typeof systemConfig !== "object") { 
            const nameKey = "name"
            const nameObject = {}
            nameObject[nameKey] = systemConfig;
            VALID_OPTION_KEYS.push(nameKey);
            systemConfig = systemConfig ? nameObject : {};
        }
        console.log({systemConfig});


        const optionsInvoked = systemConfig ? Object.keys(systemConfig): [];

        console.log({optionsInvoked});

        optionsInvoked.forEach((key) => {
            console.log({key});
            
            if(!VALID_OPTION_KEYS.includes(key))
                throw "invalid options";
            this[key] = systemConfig[key];
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
        //console.log({result: this.session});
        
        let session = new Session(this.session);
        return session;

    }
};
module.exports = System;

