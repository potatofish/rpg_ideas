Not defined within any rules to be prototyped is the definition of a "Game".

Generalized games are:
* Games are interacted with by users through the act of _playing_
* All Users that play a game are thus called Players
* Games begins play by beginning a Session (instance of playing)
* Sessions are played on a Platform (real, virtual, imaginary)
* Players join the Platform at the beginning of a Session
* Sessions begin when enough Players have joined
* Each Session breaks play into Phases
* Phases may break down into other Phases
* Each Phase may have different rules
* Systems may have rules that apply to all Phases
* Characters are fielded to the Tabletop by seated Players
* Players without Characters may create from the System rules
* Players make moves until the Session end condition is met 
* Session end condition is defined by the system

```javascript

Player: function(user) {
    // Create a unique identifier using the username's name and
    // the current date & time
    this._ID = hex(user.name) + parse(Time.now())
    this._name = user.name
}

Platform: funtion(plaformConfig) {
    this.config = platformConfig


    this.join = function(Player) {
        
        // Run the validations for players in this System
        const { validate } = this.config
        validate.join(Player)

    }
}



Session: function(rulesConfig) {
    config = rulesConfig

    let tabletop = new Platform(config.platform)
    tabletop.join()

    // find the init phase
    config.phases.forEach((phase) => new Phase(phase)

    atEnd = function() => {
        fs.write()
    }
    join = function() =>
}

Game: {
    ID: unique String,
    beginSession: () => {
        return new Session(Game.rules)
    }
    rules: {
        players: {
            types: String[]
            moves: [
                beginSession() ==>  {
                }
            ]
        }
        tabletop: {
            seats: [[number, playerType], ...], 
            characterMoves: [ 
                // herein "this" is assumed to be of class Character
                field() => {tabletop._field.push(this)}
            ]
            _field: Character[]
        }

    }
}
```
