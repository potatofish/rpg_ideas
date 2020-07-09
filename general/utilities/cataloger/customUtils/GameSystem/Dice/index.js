
//*jshint node: true, esversion: 9*/
"use strict";

const {evaluate} = require('mathjs');



module.exports.Dice = class {
    constructor() {
        
    }

    static roll(dice, faces) {
        let result = { value: 0, rolls: [] };
        for (let roll = 0; roll < dice; roll++) {
            const numberRolled = Math.floor(Math.random() * faces) + 1;
            result.value += numberRolled;
            result.rolls.push(numberRolled);
            console.log("result:", result);
        }
        return result;
    }

    //TODO handle a string like white:4d6 & black:4d6 and returning a result with two pools (white and black in this case)
    //TODO return a result that is not a strong, but is instead nested objects (e.g. result = [1, 1, 1] & 3)
    static eval(equation) {
        if (!equation)
            return 0;

        if (typeof equation !== "string")
            return NaN;

        let rollStack = equation.match(/[0-9]d[0-9]/g);
        console.log({equation, rollStack});
        
        rollStack.forEach(element => {
            let [dice, faces] = element.split('d');
            let result = this.roll(dice, faces);
            equation = equation.replace(element, `(${result.rolls.join('+')})`);
        });
        return evaluate(equation);
    }

}