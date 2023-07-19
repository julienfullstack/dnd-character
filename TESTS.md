PSEUDOCODE TESTS

Describe: CharactersSheets()

Test: It should store characters
Code: Character(Bilbo, Gandolf, Golum);
Expected Output: [Bilbo, Gandolf, Golum]


Describe: 
function NewCharacter(charName, charGender, charRace, charClass)

Test: It should store a new character and push the character to the Characters
Code: NewCharacter(Bilbo, Male, Hobbit, Traveler)
Expected Output:
[Bilbo, Male, Hobbit, Traveler]

Describe: CharacterSheets.prototype.addCharacter 
Test: "It should add a character to CharacterSheets
Code: function(Bilbo)
Expected output: [Bilbo]

Describe: CharacterSheets.prototype.deleteCharacter 
Test: "It should delete a character from CharacterSheets
Code: function(Bilbo)
Expected output: []

Describe: dndStats
Test: It should roll for stats
Code: dndStats
Expected output: 