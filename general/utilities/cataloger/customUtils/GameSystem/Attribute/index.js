//TODO define Attribute as below
/*
Attribute 
    -> name => str
    -> value => int
    -> modifier (player crunch) => array of Modifiers
    -> modifier => function

Characters in a System are made of Attributes

in 
    const System = AD&D
    Character.attributes[].length == 6

    const System.attributes.names = [Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma]

    const System.attributes.sortKey = {i: System.attributes.names[i]}

    Character.attributes[i].name is bound to System.attributes.names

    Character.attributes[i] is unique

    System.attribute[i].range = [3, 18]

    Character.attributes.value is bound within System.attribute[i].range

    Character.attributes[i].modifiers() = Attribute.modifiers(Character)

    System.attributes[i].modifiers = ???
    */

