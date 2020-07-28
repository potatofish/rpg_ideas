```javascript
System {
    Roles {
        "<role_name>": {
            matrixes: {
                "levelUp": [[level, experience], ...]
            }
    }
    Moves {
        "levelUp": function(){})
    }
    Character {
        "roles": [..., ...].forEach((role) => System.Roles.hasProperty(role)),
        "experience": === typeof Unsigned Integer
        "moves": [Function, ...]
        "level":  === typeof Unsigned Integer
    } 
}
```

To progress a character in their roles a player must
<ol>

<li> 

__Player__ _makes_ a __Character__ for a __System__ </br> 

```javascript
//load system
System.{...} = // load a bunch of things
System.moves["makeCharacter"] = makeCharacter()

//instance user as a play with moves they can make
System.sessions.begin = function(Player) {
    Player.moves.addProperty(System.moves[...])
}

await move = Player.makeMove()
if move === "makeCharacter" {
    let character = move()
}
```

<li>

__Player__ _plays_ the __Character__ during a __Session__ of a __System__

```javascript
System.
```

<li>
3) __Player__.__Referee__ _gives_ Experience to the __Character__ 

<li>
3) Give character the 

</ol>
```
```