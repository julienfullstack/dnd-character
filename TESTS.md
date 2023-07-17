PSEUDOCODE TESTS

Describe: Characters()

Test: It should store characters
Code: Character(Bilbo, Gandolf, Golum);
Expected Output: [Bilbo, Gandolf, Golum]


Describe: NewCharacter(name, gender, race, class, alignment, stats)

Test: It should store a new character and push the character to the Characters
Code: NewCharacter(Bilbo, Male, Hobbit, Traveler, str, dex, cons, int, wis, char)
Expected Output:
[Bilbo, Male, Hobbit, Traveler, Neutral Good, str, dex, cons, int, wis, char]


Describe: rollStats()
Test: "It should randomly generate a number between 1-20 for each stat and push them to Stats"
Code: rollStats()
Expected output: [3, 4, 9, 12, 20, 12, 10]

Describe: NewCharacter.prototype.Name
Test: It should display the character's name only
Code: character.Name()
Expected output: [Bilbo]

Describe: 