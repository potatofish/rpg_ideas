# Class Progression

## <center>LEVELS &  NUMBER OF EXPERIENCE POINTS NECESSARY TO ATTAIN THEM</center>
---


Each class is capable of progressing by gaining experience.  Experience is awarded to players by the referee with appropriate bonuses or penalties for prime requisite scores.





<table>
<tr><td colspan=3>

```javascript
var progressionCharts = {
```
</td></tr>
<tr><td>

```javascript
"Fighting-Men":  
```
</td>
<td>

```javascript
"Magic-Users":  
```
</td>
<td>

```javascript
"Clerics":  
```
</td></tr>
<tr><td  style="vertical-align:top">

|        Level   | Experience |
|:---------------|-----------:|
| Veteran        |  0         |
| Warrior        | 2000       |
| Swordsman      | 4000       |
| Hero*           | 8000       |
| Swashbuckler   | 16000      |
| Myrmidon**     | 32000      |
| Champion       | 64000      |
| Superhero      | 120000     |
| Lord           | 240000     |
 
</td>

<td  style="vertical-align:top">

|        Level   | Experience |
|:---------------|-----------:|
| Medium        |  0         |
| Seer        | 2500       |
| Conjurer      | 5000       |
| Theurgist           | 10000       |
| Thaumaturgist   | 20000      |
| Magician     | 35000      |
| Enchanter       | 50000      |
| Warlock*      | 75000     |
| Sorcerer           | 100000     |
| Necromancer| 200000 | 
| Wizard | 300000 |
 
</td>

<td  style="vertical-align:top">

|        Level   | Experience |
|:---------------|-----------:|
| Acolyte        | 0 |
| Adept          | 1500 |  
| Village Priest | 3000 |
| Vicar          | 6000 |
| Curate         | 12000 | 
| Bishop         | 25000 |
| Lama           | 50000 | 
| Patriarch      | 100000 |

</td></tr>

<tr><td colspan=3>

```javascript
}
```
</td></tr>

</table>


let validationsByClass = []
For each of these matrices the following is true for any Class:
* The chart has rows with elements Level & Experience cost
* The each Level is unique for all Classes in a System
* The first Level of any Class has no Experience cost (0)
* Each Level costs more Experience than the cost for the previous Level


```javascript
require(./matrix.md)
let classList = Object.Keys(progressionCharts)


System.matricies["progression"] = new Matrix([["characterClass", "progressionMatrix"]],true,validationsBySystem);

classList.forEach((className) => {
    let classMatrix = new Matrix(
        progressionCharts[className], true, validationsByClass
    )

    System.matricies["progression"].addRow([className, classMatrix])
}


let System = class {
    constructor() {
        _matrixes = {}
    }

    get classesList () {
        return Object.keys(progressionCharts)
    }

    get progressionCharts() {
        return this._classprogressionCharts
    }

    addAttribute(matrixKey, attribute) {
        _matrixes[matrix].validate(attribute)
        _matrixes[matrix].addProperty(attribute)
    }  
}



System.classesList.forEach((class) => {
    let classChart = progressionCharts[class];

    // keep a list of level titles
    let levelList = []
    classChart.forEach((row, idx) => {
        // if the title is already in the list it's a duplicate
        if(levelList.isElement(row.level))
            throw titleHasDuplicateError

        if(idx == 0 && row.experience != 0)
            throw badExperienceValue

        if(idx > 0 && row.experience <= classChart[idx-1].experience)
            throw badExperienceValue

        levelList.push(row.level)
    })
})

```

### STATISTICS REGARDING CLASSES:
<table>
<tr><td colspan=3>

```javascript
var byClassChartTwo = {
```
</td></tr>
<tr><td>

```javascript
"Fighting-Men":  
```
</td>
<td>

```javascript
"Magic-Users":  
```
</td>
<td>

```javascript
"Clerics":  
```

</td></tr>
<tr><td  style="vertical-align:top">


</td></tr>
<tr><td  style="vertical-align:top">


</td></tr>
<tr><td  style="vertical-align:top">

</td></tr>
<tr><td colspan=3>footer
</td></tr>
</table>





```javascript
const magicUsersMatrix = 
```

| Level   | Experience |  Title        | Dice for</br>Accumulative Hists | Fighting</br>Capability | Spells & Level</br>1 2 3 4 5 6 |
|:-------:|-------:|----------------|:-----:|--|:---:|
| 1       |   2000 | Medium        | 1 + 1 | Man + 1 | NIL |
| 2       |   4000 | Seer        | 2     | 2 Men +1  | NIL |
| 3       |   8000 | Conjurer      | 3     | 3 Men or Hero -1 | NIL |
| ...

```javascript
const clericMatrix = 
```
| Level   | Experience |  Title        | Dice for</br>Accumulative Hists | Fighting</br>Capability | Spells & Level</br>1 2 3 4 5 6 |
|:-------:|-------:|----------------|:-----:|--|:---:|
| 1       |   2000 | Veteran        | 1 + 1 | Man + 1 | NIL |
| 2       |   4000 | Warrior        | 2     | 2 Men +1  | NIL |
| 3       |   8000 | Swordsman      | 3     | 3 Men or Hero -1 | NIL |
| ...


Each class populates each of these fields with the same loose rules for each field:

| Level   | Experience |  Title        | Dice for</br>Accumulative Hists | Fighting</br>Capability | Spells & Level</br>1 2 3 4 5 6 |
|:-------:|-------:|----------------|:-----:|--|:---:|
| _Sequential</br>Integer_ | _Exponential</br>Integer_ | _Unique</br>String_ | _volumeInteger +</br>bonusInteger_ | _System[Chainmail]</br>.matrix[FightingCapability]_ | _undefined_ or _ByLevelMatrix_|

```javascript
// Array of truth statements about a row in such a matrix, each of which must be true 
// for the matrix to be valid
const matrixValidations = [
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

class CharacterClass {
    constructor (config) {
        this._levelingChart = new ByLevelMatrix(config.levelingMatrix, matrixValidations)

    }

    get levelingChart () {
        return this._levelingChart
    }
}

//Example of use

const clericConfig {
    label: "cleric",
    "plural-label": "clerics",
    levelingMatrix: clericMatrix
}
const cleric = new CharacterClass(clericConfig)