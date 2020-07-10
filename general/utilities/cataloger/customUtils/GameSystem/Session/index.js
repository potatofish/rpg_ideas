class Session {
    constructor(options) {
        this.flow =  (phasesArray) => {
            let phases = [];
            phasesArray.forEach((phase) => {
                phases.push({phase})
            })

            console.log(phases);
            

            return {
                setup: {}, 
                phases, 
                shutdown: {}
            };
        };
        
        if (options && options.flow)
            this.flow = options.flow;        
    }
}

module.exports = Session;
