
//*jshint node: true, esversion: 9*/
"use strict";

//TODO Make this roll more than 3d6
//TODO make this roll complex rolls
//TODO move this to a Die/Dice class (e.g. Dice.roll("3d6 + 2d10 + 3") would return roll(3,6) + roll(2,10) + 3)
function roll(dice, faces) {
    let result = { value: 0, rolls: [] };
    for (let roll = 0; roll < dice; roll++) {
        const numberRolled = Math.floor(Math.random() * faces) + 1;
        result.value += numberRolled;
        result.rolls.push(numberRolled);
        console.log("result:", result);
    }
    return result;
}
exports.roll = roll;
