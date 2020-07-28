```javascript
System.matrix["savingThrows"] = {
```
### SAVING THROW MATRIX
| <br><br><br>Class | <br><br><br>Level | <br><br>Death Ray<br> or Poison | All Wands -<br> Including<br>Polymorph<br>or Paralization | <br><br><br>Stone | <br><br>Dragon<br>Breath | <br><br>Staves &<br>Spells |
| ----  | :---:  |:---:|:---:|:---:|:---:|:---:|
| Fighting-Men | 1-3   | 12 | 13 | 14 | 15 | 16 | 
| Magic-User   | 1-5   | 13 | 14 | 13 | 16 | 15 |     
| Cleric       | 1-4   | 11 | 12 | 14 | 16 | 15 | 
| Fighter      | 4-6   | 10 | 11 | 12 | 13 | 14 |  
| Magic User   | 6-10  | 11 | 12 | 11 | 14 | 12 |      
| Cleric       | 5-8   | 09 | 10 | 12 | 14 | 12 | 
| Fighter      | 7-9   | 08 | 09 | 10 | 10 | 12 |  
| Magic-User   | 11-15 | 08 | 09 | 08 | 11 | 08 |       
| Cleric       | 9-12  | 06 | 07 | 09 | 11 | 09 |  
| Fighter      | 10-12 | 06 | 07 | 08 | 08 | 10 |    
| Magic-User   | 16+   | 05 | 06 | 05 | 08 | 03 |     
| Cleric       | 13+   | 03 | 05 | 07 | 08 | 07 | 
| Fighter      | 13+   | 04 | 05 | 05 | 05 | 08 |  

```javascript
}
```

Failure to make the total indicated above results in the source having full effect. 

Examples:

* turned to stone,
* full damage from dragon's breath
* etc

Scoring the total indicated above (or scoring higher) means the weapon has 
* no effect (death ray, polymorph, paralization, stone, or spell) 
* one-half effect (poison scoring one-half of the total possible hit damage and dragon's breath scoring one-half of its full damage). 

Wands of cold, fire balls, lightning, etc. and  staves are treated as indicated, but saving throws being made result in one-half damage.

```javascript
// an array of effects (configs) that cause saving throws
// are stored in the master list of Effects for a system
var saveableEffectConfigs = [ { outcome:..., ... } , ... ] 
saveableEffectConfigs.forEach((effectConfig =>
    var effect = new Effect(effectConfig)
    effect.isSaveable = function() { return true }
    var effectKey = System.Effects.push(effect)
} 

Effect.resolve = function(savingThrowResult) {
    // Any effect that can't be saved against just does what it does
    // Any effect that isn't saved against has the same effect
    if !(this.isSaveable()) || !savingThrowResult
        return this.outcome

    // Effects that do damage do half damage
    if this.outcome instanceof Damage
        return this.outcome/2

    // All remaining effects have a "no effect" outcome
    return "No Effect"
}


System.resolveEffect = function(defender, effect) {
    if !(effect.isSaveable())
        return effect.resolve();

    var saveDieSides = 20 //TODO confirm

    var saveDieRoll = Dice.roll(1, saveDieSides)

    var saveDieTarget = System.lookup(
        "savingThrows", 
        { defender.CharacterClass, defender.Level }
    )

    var outcome = effect.resolve(saveDieRoll >= saveDieTarget )

    return outcome
}

//example uses
Player.takeAction = function (action) {
    var {target, effect} = action
    Player[Referee].narrate(System.resolveEffect(target, effect))
}
```
