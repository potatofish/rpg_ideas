const Attribute = require('Attribute');
const { Dice } = require("../../../Dice");

(async () => {
    console.log(require.main.path);
    console.log(new Attribute("Strength", Dice.roll(3, 6)));
    let roll = Dice.eval("{white:4d6, black:4d6}");
    console.log({roll});
    
})();



