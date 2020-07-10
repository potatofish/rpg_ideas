function validateConstrutorOptions(options) {
    if(!options || !options.flow || !options.flow.phases) throw "bad";
    console.log({Map: new Map([[!options, "bad"]])});

    const VALIDATION_OPTIONS = [
        [!options, ()=>{return "argument options is not defined";}],
        [!options.flow, ()=>{return "argument options.flow is not defined";}],
        [!options.flow.phases, ()=>{return "argument options.flow.phases is not defined";}]
    ];


    
    const validationMap = new Map(VALIDATION_OPTIONS);
    console.log({VALIDATION_OPTIONS, validationMap });
    for (const [key, value] of validationMap) {
        console.log([key, value]);
        if(key) throw value();
    }
    
}

class Session {
    constructor(options) {
        validateConstrutorOptions(options)
        
        this.phases = options.flow.phases;
        this.characters = options.characters;
        
    }

    get flow() {
        return {
            setup: {}, 
            phases: this.phases, 
            shutdown: {}
        };
        
    }
}

module.exports = Session;
