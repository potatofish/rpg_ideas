# <center>Spells</center>
```javascript
System.matrix["spells"] = [
    new Spell({name: String, effect: Effect}),
    ...
]

System.matrix["CharacterClasses"] = [
    new CharacterClass(
        name: String,
        byLevelCharts: {
            spellList: Spell[],
            moves: Function[]
        }[]
    ),
    ...
]

// TODO add spelllevel advancement matrix, 

var pdfPath = String // a path to a pdf of Men & Magic

var spellExplanations = parse(
    fileSystem.read(pdfPath, pages: [22, 34]), 
    content-type: "spellExplanation"
)

spellExplanations.forEach((explanation: {spell, class, level}) => {
    System.matrix["spells"].push(spell)
    System.matrix["CharacterClasses"][class].byLevelCharts[level].spellList.push(spell)
})
```

### <center>MAGICAL RESEARCH</center>
---
The level of the magic required to operate the spell (determination by referee) dictates the initial investment. 

```javascript
reasearchMagic = function (investmentTier === /[1-5]/, spellName, effect) { 
    var researcher = this
    var spellLevel = Player["Referee"].decision(effect)
```

Investment for 1st level is 2,000 Gold Pieces, 2nd level is 4,000 Gold
Pieces, 3rd level is 8,000 Gold Pieces, 4th level is 16,000 Gold Pieces, 5th level is 32,000 Gold Pieces, and 6th level is 64,000 Gold Pieces. 

The time required is one week per spell level. For every amount equal to the basic investment spent there is a 20% chance of success, cumulative.

```javascript
    var spellInvestment = {
        gold: 2^spellLevel*1000,
        time: Time.inSeconds("1 Week")*spellLevel
        chanceOfSuccess: 20%
    }

    if researcher.gold < (spellInvestment.gold * investmentTier)
        throw notEnoughGoldError
```
The level of the spell researched must be consistent with the level of the MagicUser or Cleric involved, i.e. the character must be able to use spells equal to or above the level of the one he desires to create.
```javascript
    if researcher.inventory.SpellBook[spellLevel] === undefined
        throw cantCastSpellError

    researcher.gold -= (spellInvestment.gold * investmentTier)
    researcher.occupied((spellInvestment.time * investmentTier))
    
    const rollForSuccess = Dice.roll(1,100)

    const spellResearched = (
        rollForSuccess 
           <= (spellInvestment.chanceOfSuccess * investmentTier)
    )
```
Once a new spell is created the researcher may include it in the list appropriate to its level. He may inform others of it, thus enabling them to utilize it, or he may keep it to himself.
```javascript
    if spellResearched {
        researcher.inventory.SpellBook[level]
            += new Spell(spellName, effect)
    }

    return {
        cost: {
            investmentTier *
            {{gold, time, chanceOfSuccess} : spellInvestment}
        },
        result: {
            roll: rollForSuccess, 
            success: spellResearched
        }
    }
} 
```
Both Magic-Users and Clerics may attempt to expand on the spells listed (as applicable by class). 
```javascript
static researchMagic = function (Spell)  {...}

// Only Magic-Users & Clerics have spellLists, so give them a level-0
// ability to research magic
System.matrix["CharacterClasses"].forEach((class) => {
    if class.byLevelCharts.hasProperty("spellList")
        class.byLevelCharts.moves[0].addProperty(researchMagic)
})
```
#### <center>_FOR EXAMPLE_</center>

```javascript
// Assuming a a new character with a spell list
const characterConfig = {
    name: String, 
    class: CharacterClass.hasProperty("spellList"), 
    moves: [],
    ...
};

// ResearchMagic would be added from class.byLevelCharacter at creation
static Character.init = function(config) {
    var aNewCharacter = new Character(characterConfig)
    this.moves += this.class.byLevelCharts.moves[levelIndex<=1]
};

// when leveling occurs characters gain new moves, 
// but this doesn't matter for spells
// TODO add gaining  new spells here
// TODO add gaining new spellbooks here
Session.level = function(character) {
    character.level++
    character.moves += character.class.byLevelCharts[level].moves
}
```
An investment of 10,000 Gold Pieces in order to develop new 1st level spell, for example, has a 100% chance of success after one game week.
```javascript
var SpellCasterFoo = Character.init(characterConfig)
var SpellCasterBar = Character.init(characterConfig)

var tier = 5 // chance is always 20%/tier, 100% = tier 5
var name = "Generic Level 1 Spell" // a spell the referee has already said is level 1
var effect = new Effect(...) // actual effect is n/a for example

var researchResult  
    = SpellCasterFoo.moves.researchMagic(tier, name, effect);
/*
researchResult will eval to {
    cost: {
        gold: 10000, 
        time: Seconds.("1 Week"), 
        chanceOfSucces: 100
    },
    result: {
        roll: Dice.(1d100),
        success: true
    }
*/ 

SpellCasterBar.moves.castSpell("Generic Level 1 Spell") 
// throws spellNotInSpellBook error 

SpellCasterFoo.moves.castSpell("Generic Level 1 Spell") 
// does not inherently throw errors

```

### <center>BOOKS OF SPELLS</center>
---
Characters who employ spells are assumed to acquire books containing the
spells they can use, one book for each level. 
```javascript
Item interface () {
    this.replacementValue = 0
}

SpellBook class implements Item (level, Spells[]) {
    this._level = level
    this._spells = Spells

    get level { return this._level }

```
If a duplicate set of such books is desired, the cost will be the same as the initial investment for research as listed above, i.e. 2,000, 4,000, 8,000, etc. Loss of these books will require replacement at the above expense.

```javascript
    get replacementValue {
        //TODO take the multiplicant to a const
        return this._spells.length * 2^spellLevel*1000
    }
}
```
