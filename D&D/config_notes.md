# Attributes

### __Source:__
> __Dungeons & Dragons__ (TSR, 1974)
> _Volume 1: [Men and Magic](https://cdn.preterhuman.net/texts/gaming_and_diversion/RPG/TSR%202002%20Vol%201%20Men%20&%20Magic.pdf)_

## Brainstorm CHARACTER objects
### Role
+ available[] = Referee, Player


### Class
+ available[] = Fighting-man, Magic-User, Cleric
+ value = available[Player.pick]
+ requisites 
    * {_Ability_: rate } = foreach(value.requisities)
    

### Race
+ available[] = Human, Dwarf, Elf, Halfling
+ value = available[Player.pick]
+ languages() = value.languages()

### Alignment => 
+ available[] = Law, Neutrality, Chaos
+ value = available[Player.pick]
+ languages() => value

### Languages => 
+ base[] = Common
+ available[] = Alignment.languages(), Race.languages()
+ max = Ability Scores[Intelligence] < 10 ? 0  : Ability Scores[Intelligence] - 10
+ value[] = base + available[forEach(Player.pick)]

### Abilities 
+ labels[] = Strength, Intelligence, Wisdom, Constitution, Dexerity, Charisma
+ generate() = Dice.roll(3d6)
+ value = [>= 3, <= 18]

### Hit Dice
+ diceVolume = Class.hitDice(Level)
+ results []
+ hit points = SUM(results) + (diceVolume * Ability Scores[Constitution].hitDice) + Class.hitDiceModifier

### Survival Chance 
+ value = Ability Scores[Constitution].survival

### Fire Missle 
+ value = base + Ability Scores[Dexterity].fireMissile


### Magic 
+ resistance = 
+ spellsPerSpellLevel = CharacterClass.spellsPerSpellLevel(Experience.Level)

### Biography
+ Name = Player.pick
+ Relative = Player.pick
+ Title = CharacterClass.title(Experience.Level)

### Equipment
+ gold = _integer_
+ init() = set(gold, Dice.roll(3d6) * 10)
+ buy(_item_) => 
    + gold -= _item_.cost
    + inventory.push(_item_)
+ inventory = [];
+ encumberanceWeight += SUM(inventory[*].weight) + gold

### Fight
+ chainmailFightingCapability = CharacterClass.cmFightingCapability(Experience.Level)
+ thac

### Prime Requisite
+ _experienceRequisite = max(Math.round(Ability Scores[_Ability_] * class.requisites.forEach(_Ability_: rate)))
+ experienceBonus = switch(_experienceRequisite)
    + \>=15: .10
    + \>=13 && <=14: .5
    + \>=07 && <=08: -(.10)
    + <= 6: -(.20)
    + default: 0
     
    

### Experience 
+ Earned += (Player[Referee].giveExp(_integer_))
+ Total: Earned + (Prime Requisite.experienceBonus * Earned)
+ Level = _index_ where
    + _index_ >= 1
    + CharacterClass.ExperienceChart[_index_ - 1] \> Earned 
    + CharacterClass.ExperienceChart[_index_] < Earned 

### Hirelings 
+ {Maximum, Loyalty Base} = Ability Scores[Charisma]


### Anti-Cleric
Note: There are Anti-Clerics (listed below) who have similar powers to Clerics. 

Those Clerical spells underlined on the table for Cleric Spells have a reverse effect, all others functioning as noted. The chief exception is the Raise Dead spell which becomes:

The Finger of Death: Instead of raising the dead, this spell creates a "death ray" which will kill any creature unless a saving throw is made (where applicable). Range: 12". (A Cleric-type may use this spell in a life-or-death situation, but misuse will immediately turn him into an Anti-Cleric.) 

Anti-Clerics: Evil Acolyte, Evil Adept, Shaman, Evil Priest, Evil Curate, Evil Bishop, Evil Lama, Evil High Priest.

