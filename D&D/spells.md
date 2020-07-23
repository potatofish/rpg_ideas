```javascript
System.matrix["spells"] = [
    new Spell({name: String, effect: Effect, target: String})
    ...
]

System.matrix["CharacterClasses"] = [
    new CharacterClass(name: String, spellList: Spell[][]) }
    ...
]

var pdfPath = String // a path to a pdf of Men & Magic

var spellExplanations = parse(
    fileSystem.read(pdfPath, pages: [22, 34]), 
    content-type: "spellExplanation"
)

spellExplanations.forEach((explanation: {spell, class, level}) => {
    System.matrix["spells"].push(spell)
    System.matrix["CharacterClasses"][class].spellList[level].push(spell)
})

```

### MAGICAL RESEARCH:
Both Magic-Users and Clerics may attempt to expand on the spells listed (as applicable by class). 
```javascript
static researchMagic = function (Spell)  {...}
// Only Magic-Users & Clerics have spellLists

System.matrix["CharacterClasses"].forEach((class) => {
    if class.hasProperty("spellList")
        class.addProperty(researchMagic)
})

reasearchMagic = function (Spell) { 
    var spellLevel =    
```

The level of the magic required to operate the spell (determination by referee) dictates the initial investment. 

Investment for 1st level is 2,000 Gold Pieces, 2nd level is 4,000 Gold
Pieces, 3rd level is 8,000 Gold Pieces, 4th level is 16,000 Gold Pieces, 5th level is 32,000 Gold Pieces, and 6th level is 64,000 Gold Pieces. 

The time required is one week per spell level. For every amount equal to the basic investment spent there is a 20% chance of success, cumulative. 
```javascript
var spellInvestment = function (spellLevel) {
    return {
        gold: 2^spellLevel *1000,
        time: Time.inSeconds("1 Week")
        chanceOfSuccess: 20%
    }
}


```


An investment of 10,000 Gold Pieces in order to develop new 1st level spell, for example, has a 100% chance of success after one game week.

The level of the spell researched must be consistent with the level of the MagicUser or Cleric involved, i.e. the character must be able to use spells equal to or above the level of the one he desires to create.

Once a new spell is created the researcher may include it in the list appropriate to its level. He may inform others of it, thus enabling them to utilize it, or he may keep it to himself.


BOOKS OF SPELLS:
Characters who employ spells are assumed to acquire books containing the
spells they can use, one book for each level. If a duplicate set of such books is desired, the cost will be the same as the initial investment for research as listed
above, i.e. 2,000, 4,000, 8,000, etc. Loss of these books will require replacement
at the above expense.
