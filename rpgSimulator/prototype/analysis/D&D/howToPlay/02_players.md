# RECOMMENDED EQUIPMENT:
* Rulebooks
    * Dungeons and Dragons [Required]
    * Outdoor Survival 
    * Chainmail miniature rules
* Dice [__Required__]
    * 1 pair each 4-sided, 8-sided, 12-sided dice
    * 4+ pairs of 6-sided dice
* Character Sheets [Required]
    * 3-Ring Notebook w/ Lined Paper (constant character data)
    * Clear Sheet Protectors         (variable character data)
* Maps
    * Graphing paper (6 lines/inch is best)
    * Drafting Equipment & Colored Pencils
* Players
    * 1 referee player [Required]
    * 1+ character players [Required]
    * Imagination
    * Scratch Paper & Pencils

```javascript
require(01_system.md)

// load the rule book
rules = fs.read("Dungeons and Dragons") // assumes an array of rules is read and added as properties
rules.foreach((rule) => {
    dnd.addProperty(rule)
}

// have dice avaiable to roll
dnd.roll(num,sides) => {return Dice.roll(num,sides)}

// make a blank character sheet
dnd.makeCharacter() => {return new Character(dnd.config["Character"])}

// have 1 referee, and 1+ other players
let ref = new Player("Foo", "Referee")
let players = [new Player("Bar"), new Player("Bey")]

// start a session of play
dnd.startSession(ref, players) => {
    // players sit at the table
    let tabletop = new Table(Array.join(ref, players))
    
    // players put characters they've made into the field of play
    // if they haven't made characters they can make them
    tabletop.forEach((Player) => {
        let playerCharacter 
            = Player.load(Player.prompt(characterFile)) 
                || dnd.makeCharacter()
        tabletop.fieldCharacter(playerChaacter)
    })

    // play continues until the referee signals end of session
    // players make moves
    // referee judges those moves
    // the judgement is applied to the tabletop state
    while(!ref.endSession) {
        let move = await players[any].madeMove()
        let result = await ref.judgment(move) // some will auto judge 
        tabletop.apply(result)
    }

    // store relevant information for the tabletop session for next time
    // this saves changes to character, settings, and rules
    tabletop.save()
}
```