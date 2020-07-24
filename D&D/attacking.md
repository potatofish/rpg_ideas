### <center>ALTERNATIVE COMBAT SYSTEM</center>
---
This system is based upon the defensive and offensive capabilities of the combatants being plotted into two matrixes. 

There are two charts, one for men versus men or monsters and one for monsters (including kobolds, goblins, orcs, etc.) versus men.


```javascript
System.table["menAtackingMen"] = {
```
<table><tr><td></td><td></td><td></td><td>
<b>Matrix I: Men Attacking Men</b></br>
<sub>1d20 to Hit by attacker's level vs target's AC</sub>
</td></tr>
<tr><td colspan=4>

| AC | Tier1 | Tier2 | Tier3 | Tier4 | Tier5 | Tier6+ |
|----|-------|-------|-------|-------|-------|--------|
| 2  | 17 | 15 | 12 | 10 | 08 | 05 |
| 3  | 16 | 14 | 11 | 09 | 07 | 04 |
| 4  | 15 | 13 | 10 | 08 | 06 | 03 |
| 5  | 14 | 12 | 09 | 07 | 05 | 02 | 
| 6  | 13 | 11 | 08 | 06 | 04 | 01 |
| 7  | 12 | 10 | 07 | 05 | 03 | 01 |
| 8  | 11 | 09 | 06 | 04 | 02 | 01 |
| 9  | 10 | 08 | 05 | 03 | 01 | 01 |
</td></tr></table>

```javascript
}
```

For men versus men, the tier of an attacker is determined by thier level and the rate at which thier class advances tiers.
* Fighting-Men advance in tiers grouped by level/3
* Magic-Users advance in tiers grouped by level/5
* Clerics advance in tiers by level/4 
* Normal men equal 1st level fighters.

```javascript
System.classes = 
    new CharacterClass(["Fighting-Men","Magic-Users", "Clerics"])
        .attackTierInterval = [3, 5, 4]

Character.attackTier = function() {
    var tier = this.CharacterClass 
        ? round(this.level/this.CharacterClass.attackTierInterval)
        : 1
    return tier

}
```
<h2>Matrix II: Monsters Attacking Men</h2>

```javascript
System.table["monstersAtackingMen"] = {
```
<table><tr><td></td><td></td><td></td><td>
<sub>1d20 to Hit by Monster's Dice# vs target's AC</sub>
</td></tr>
<tr><td colspan=4>

| AC | <= 1 | 1+1 | 2-3 | 3-4 | 4-6 | 6-8 | 9-10 | 11&1 |
|----|----|---|---|----|----|----|----|----|
| 2  | 17 | 16 | 15 | 13 | 12 | 11 | 09 | 07 |
| 3  | 16 | 15 | 14 | 12 | 11 | 10 | 08 | 06 |
| 4  | 15 | 14 | 13 | 11 | 10 | 09 | 07 | 05 |
| 5  | 14 | 13 | 12 | 10 | 09 | 08 | 06 | 04 | 
| 6  | 13 | 12 | 11 | 09 | 08 | 07 | 05 | 03 |
| 7  | 12 | 11 | 10 | 08 | 07 | 06 | 04 | 02 |
| 8  | 11 | 10 | 09 | 07 | 06 | 05 | 03 | 01 |
| 9  | 10 | 09 | 08 | 06 | 05 | 04 | 02 | 00 |

</td></tr></table>

```javascript
}
```

All base scores to hit will be modified by magic armor and weaponry. 

```javascript
Character.equipBonus = function (attribute) {
    var bonus = 0
    Character.equiped.forEach((gear) => {
        bonus += gear.bonus[attribute] ? gear.bonus[attribute] : 0
    }
}

Character.armorClass = function() {
    var armorClass = 9
    return armorClass - Character.equipbonus("armorClass")
}
```
Missile hits will be scored by using the above tables at long range and decreasing Armor Class by 1 at medium and 2 at short range.
```javascript
System.table["rangeBonus"] = {
    long: 0, medium: 1, short: 2 
}

Session.Setting.missleRange = function (characterA, characterB) {
    var rangeOptions = System.table["rangeBonus"].keys
    var distance = 
        Session.Setting.location(characterA) - 
        Session.Setting.location(characterB)

    var refereeCall = 
        Session.Player["Referee"].pick(distance, rangeOptions)
        
    return refereeCall
}
```

All attacks which score hits do 1-6 points damage unless otherwise noted.
```javascript
Session.Setting.attack = function(attacker, defender) {
    var attackDieSides = 20

    var {attackerTable, attackerTier} 
        = attacker.isMen 
        ? { "menAttackingMen", attacker.attackTier }
        : { "monstersAtackingMen", attacker.Dice }
    

    var attackRollToHitTarget = System.lookup(
        System.lookup(attackerTable, attackerTier), 
        defender.armorClass
    )
 
    if(attacker.weaponEquiped.isMissile) {}
        attackRollToHitTarget -= System.lookup(
            "rangeBonus", 
            Session.Setting.missleRange(attacker, defender)
        )
    }

    var attackRoll = Dice.roll(`1d${attackDieSides}`)
    var isHit = (attackRoll >= attackRollToHitTarget)
    var damage = isHit 
        ? Dice.roll(
            attacker.weaponEquiped 
                ? attacker.weaponEquiped.Damage 
                : "1d6"
            )
        : 0
    return {attackRoll, isHit, damage}
}
// 
```
