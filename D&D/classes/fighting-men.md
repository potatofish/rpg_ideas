```javascript
require("CharacterClass")

const levelingMatrixRowDefinition = {
    validations: [
            // level is sequential unsigned integer, starting @ 1
            level >= 1, level typeof Integer, rowIndex = level - 1,

            // experience is an unsigned integer that grows every level
            experience typeof Integer, level > 1 && experience > rows[rowIndex-1].experience,
            
            // title is a string unique to the column
            title typeof String, title !== rows[* !== rowIndex].title,

            // Dice are a combination of integers
            // a volume of dice and a bonus to add to the result
            // if a bonus is 0, it is not supplied
            dice.length > 2, 
            dice.volume typeof Integer, 
            dice.length == 2 && dice.bonus typeof Integer

            //FightingCapability is an array of strings representing Chainmail system rules
            fighting.foreach((capability) => {
                capability typeOf String,
                System["Chainmail"].matrix("FightingCapability").isElement(capability))
            }

            //Spells&Level is a byLevelMatrix or undefined
            spells === undefined || spells instanceOf ByLevelMatrix
    ]
]
```
| Level   | Experience |  Title        | Dice for</br>Accumulative Hists | Fighting</br>Capability | Spells & Level</br>1 2 3 4 5 6 |
|:-------:|-------:|----------------|:-----:|--|:---:|
| 1       |   2000 | Veteran        | 1 + 1 | Man + 1 | NIL |
| 2       |   4000 | Warrior        | 2     | 2 Men +1  | NIL |
| 3       |   8000 | Swordsman      | 3     | 3 Men or Hero -1 | NIL |
| ...
| _Sequential</br>Integer_ | _Exponential</br>Integer_ | _Unique</br>String_ | _volumeInteger +</br>bonusInteger_ | _System[Chainmail]</br>.matrix[FightingCapability]_ | _Always undefined_ |

```javascript
const fightingManConfig = {levelingChart: levelingMatrixRAW}

const fightingManClass = new CharacterClass(fightingManConfig)

console.log(fightingManClass.levelingChart.lookup(2, "Title"))
// should print "Warrior" to console

export fightingManClass
```