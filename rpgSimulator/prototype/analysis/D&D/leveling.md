```javascript
class ByLevelMatrix {
    constructor(twoDeeArray[][]) {
        // shift the header table row into a field list to find columns by
        this._fieldList = twoDeeArray.shift()

        // a by level matrix field list has to be an array
        if !(this._fieldList typeof Array)
            throw invalidArrayHeader
        
        //find the indexes of any Level columns
        const indexesOfMatrixKeyField = this._fieldList.indexOf("level")

        // a by level matrix must have a "Level" column
        if indexesOfMatrixKeyField.length === 0
            throw levelFieldMissing

        // a by level matrix can only have one "Level" column
        if indexesOfMatrixKeyField.length > 1
            throw levelFieldNotUnique

        const keyColumnIndex = indexesOfMatrixKeyField[0]

        twoDeeArray.forEach((levelFieldValues, levelIndex) => {
            // level array of fields has to be an array
            if !(levelFieldValues typeof Array)
                throw invalidArray

            // level should match levelIndex + 1 b/c of 0-indexing
            if levelFieldValues[keyColumnIndex] !== levelIndex + 1
                throw levelingChartUnsorted
                
            this._matrix.addProperty(levelIndex, levelArray)
        })
    }

    lookup (level, field) {

        let fieldColumnIndex = undefined
        if field !== undefined {
            const foundIndex = this._fieldList.indexOf(field)

            if !(foundIndex >= 0)
                throw invalidField
            
            fieldColumnIndex = foundIndex
        }

        if !(level >= 1) 
            throw invalidLevel
        
        let result = this._matrix[level - 1]
        if (fieldColumnIndex)
            result = result[fieldColumnIndex]

        return result
    }

    get fullChart {
        return Array.join(this._fieldList, this._matrix)
    }
    
}

//TODO revisit from this point forward after making other class mds
//lookup a system table
System.lookup = function(table, element) {
    return this.tables[table][element]
}

System.matrix["LevelsByClass"] = require("./classes/index")

Session.level = function(characterClass, experience)) {
    var levelingChart = System.lookup("LevelsByClass", characterClass);
    var level = levelingChart(experience)
}
```