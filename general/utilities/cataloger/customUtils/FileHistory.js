const DEFAULTS = {maxHistorySize: 10, history: []};

const FileHistory = class {
    constructor(options) {
        //validate
        if(options === undefined) {
            Object.assign(this, DEFAULTS);
            return;
        }
        
        this.maxHistorySize = (()=>{
            if (options.maxHistorySize && parseInt(options.maxHistorySize))
                return options.maxHistorySize;
            if (parseInt(options))
                return options;
            throw `maxHistorySize must be an integer.` +
                `${maxHistorySize} is not one.`;
        })(); 

        this.history = (()=>{
            if (options.history) {
                if(Array.isArray(options.history))
                    return options.history;
                else 
                    throw `history must be an Array.` +
                        `${options.history} is not one.`;
            } 
            return DEFAULTS.history;
        })(); 
    }

    getHistory(index) {
        if(index === undefined)
            return this.history;
        return this.history[index]
    }

    updateHistory(path, onUpdate) {
        // create a new history, removing any entries set to ${path}
        let newHistory = this.history.filter((val) => {return val !== path});
        
        //console.log("FILTERED HISTORY: ", newHistory);
        
        // unshift the path to the front of the array, and if the resulting
        // history is too big, pop one off the end
        if(newHistory.unshift(path) > this.maxHistorySize)
            newHistory.pop();
        this.history = newHistory;

        if(onUpdate)
            onUpdate();
        
        //this.history.forEach((e,i) => { console.log(`${i}:${e}`); });
        
    }
};

module.exports = FileHistory;
