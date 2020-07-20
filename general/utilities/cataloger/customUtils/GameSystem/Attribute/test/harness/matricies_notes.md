## Fighting Men 
### Leveling

| Level   | Total |  Sum        | Power          |
|:-------:|-------|-------\---------|----------------|
| 1       |  2000 | ?           | 2^1 * 1000     |
| 2       |  4000 | 2000 + 2000 | 2^2 * 1000     |
| 3       |  8000 | 4000 + 4000 | 2^3 * 1000     |
| _level_ |  -    |     -       | 2^_level_*1000 |

### Attacking

* __attackRoll__ = AR = D20.roll()
* __attackbyLevelGroup__  = AbLG = Level/3
* __targetArmorClass__ = tAC = targetCharacter.AC

| tAC | Desc | AR >  for | AbLG=1 | AbLG=2 | AbLG=3 | AbLG=4 | AbLG=5 | AbLG=6+ |
|----|---|---|----|---|---|----|----|----|----|
| 2  |   |   | 17 | 15 | 12 | 10 | 08 | 05 |
| 3  |   |   | 16 | 14 | 11 | 09 | 07 | 04 |
| 4  |   |   | 15 | 13 | 10 | 08 | 06 | 03 |
| 5  |   |   | 14 | 12 | 09 | 07 | 05 | 02 | 
| 6  |   |   | 13 | 11 | 08 | 06 | 04 | 01 |
| 7  |   |   | 12 | 10 | 07 | 05 | 03 | 01 |
| 8  |   |   | 11 | 09 | 06 | 04 | 02 | 01 |
| 9  |   |   | 10 | 08 | 05 | 03 | 01 | 01 |

* Fighting-Men: Magic-Users advance in steps based on
five levels/group (1-5, 6-10, etc.), and Clerics in steps
based on four levels/group (1-4. 5-8, etc.). Normal men
equal 1st level fighters.

```javascript
switch(CharacterClass) {
    "fighting-man":
        CharacterClass.AttackGroupingRate = 3
    "cleric":
        CharacterClass.AttackGroupingRate = 4
    "magic-user":
        CharacterClass.AttackGroupingRate = 5
}

Session.attack = function(attacker, defender) {
    // dAC = armor class of defender
    // AbLG = group by level and class to look up attack skill
    var attackbyLevelGroup = attacker.Level/attacker.CharacterClass.AttackGroupingRate

    var attackDieSides = 20
    var highestMiss = attackDieSides - 1 // (critical rolls, 20 always hits, 1 always misses) 
    var attackRollToHitTarget = min(highestMiss - defender.ArmorClass - (attackbyLevelGroup) - 1, 1)

    var attackRoll = Dice(`1d${attackDieSides}`)
    var isHit = (attackRoll >= attackRollToHitTarget)
    return isHit
}
// 
```
  



## Magic Users - levels
| Level   | Total  |  Sum        | Power          |
|:-------:|--------|-------------|----------------|
| 1       |  2500  | ?           | 2^1 * 1250     |
| 2       |  5000  | 2500 + 2500 | 2^2 * 1250     |
| 3       |  10000 | 5000 + 5000 | 2^3 * 1250     |
| 4       |  20000 | 10000 * 2   | 2^4 * 1250     |
| 5       |  35000 |             | (2^5 * 1250 ) -5000  or 2^4 *1250 |
| 6       |  50000 |             | (2^6 * 1250) - 30000 |
| 7 
| _level_ |  -     |     -       | 2^_level_*1000 |

## Clerics -levels
| Level   | Total  |  Sum        | Power          |
|:-------:|--------|-------------|----------------|
| 1       |  1500  | ?           | 2^1 * 750     |
| 2       |  3000  | 1500 + 1500 | 2^2 * 750     |
| 3       |  6000  | 5000 + 5000 | 2^3 * 750     |
| _level_ |  -     |     -       | 2^_level_*1000 |