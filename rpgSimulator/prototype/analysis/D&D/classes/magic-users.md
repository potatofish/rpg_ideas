```javascript
const levelingMatrixRAW =
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

log(fightingManClass.levelingChart.lookup(2, "Title"))
// should print "Warrior"

```