```javascript
class CharacterClass {
    constructor (config) {
        this._levelingChart = new ByLevelMatrix(parse(config.levelingMatrixRAW))
    }

    get levelingChart () {
        return this._levelingChart
    }
}