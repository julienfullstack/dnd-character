// Business logic

function CharacterSheets() {
  this.characters = [],
  this.currentId = 0
}

function Character(Name, Gender, Race, Class, Alignment) {
  this.Name = Name,
  this.Gender = Gender,
  this.Race = Race,
  this.Class = Class,
  this.Alignment = Alignment,
  this.stats = {};
}

CharacterSheets.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

CharacterSheets.prototype.addCharacter = function(character) {
  character.id = this.assignId();
  this.characters.push(character);
}

CharacterSheets.prototype.findCharacter = function(id) {
  for (var i=0; i< this.characters.length; i++) {
    if (this.characters[i]) {
      if (this.characters[i].id == id) {
        return this.characters[i];
      }
    }
  };
  return false;
}

CharacterSheets.prototype.deleteCharacter = function(id) {
  for (var i=0; i< this.characters.length; i++) {
    if (this.characters[i]) {
      if (this.characters[i].id == id) {
        delete this.characters[i];
        return true;
      }
    }
  };
  return false;
}

// Character.prototype.addStats = function(stat) {
//   this.stats.push(stat);
// }

// STAT LOGIC //
const dndStats = {
  Strength: 0,
  Dexterity: 0,
  Constitution: 0,
  Intelligence: 0,
  Wisdom: 0,
  Charisma: 0
};

document.getElementById('roll-button').addEventListener('click', rollStats);

function rollStats(event) {
  event.preventDefault();

  const stats = { ...dndStats };

  for (let stat in stats) {
    stats[stat] = rollDice();
  }

  createGrid(stats);
}

function rollDice() {
  const diceRolls = [];

  for (let i = 0; i < 4; i++) {
    diceRolls.push(Math.floor(Math.random() * 6) + 1);
  }

  diceRolls.sort((a, b) => a - b);
  diceRolls.shift();
  const total = diceRolls.reduce((sum, roll) => sum + roll, 0);

  return total;
}

function createGrid(stats) {
  const grid = document.getElementById('stat-grid');
  grid.innerHTML = '';

  for (let stat in stats) {
    const row = document.createElement('tr');

    const statCell = document.createElement('td');
    statCell.textContent = stat;
    row.appendChild(statCell);

    const valueCell = document.createElement('td');
    valueCell.textContent = stats[stat];
    row.appendChild(valueCell);

    grid.appendChild(row);
  }
}

// function resetGrid() {
//   const grid = document.getElementById('stat-grid');
//   grid.innerHTML = '';
// }

// UI logic

var characterSheet = new CharacterSheets();

function showCharacter(id) {
  var character = characterSheet.findCharacter(id);
  $("#show-character").show();
  $(".name").html(character.Name);
  $(".gender").html(character.Gender);
  $(".race").html(character.Race);
  $(".class").html(character.Class);
  $(".alignment").html(character.Alignment);
  $(".stats").html( );
  // var stats = "";
  // character.stats.forEach(function(stat) {
  //   stats += "<li>" + stat + "</li>";
  // });
  // $("#show-stats").html(stats);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + character.id + ">Delete</button>");
}
function attachCharacterListeners() {
  var list = $("ul#characters");
  list.on("click", "li", function() {
    showCharacter(this.id);
  });
  var buttons = $("#buttons");
  buttons.on("click", ".deleteButton", function() {
    characterSheet.deleteCharacter(this.id);
    $("#show-character").hide();
    display(characterSheet);
  });
  buttons.on("click", ".updateButton", function() {
    showUpdate(this.id);
  });
}

function display(book) {
  var list = $("ul#characters");
  var records = "";
  book.characters.forEach(function(character) {
    records += "<li id=" + character.id + ">" + character.Name + " " + "</li>"
  });
  list.html(records);
}

function resetForm() {
  var form = document.getElementById("new-character"); 
  form.reset();
  $("button.alignment-button").removeClass("clicked");
  const grid = document.getElementById('stat-grid');
  grid.innerHTML = '';
}

$(document).ready(function() {
  attachCharacterListeners();
  var clickedAlignment;
  $("button.alignment-button").click(function(event) {
    event.preventDefault();
    var alignment = $(this).text();
    clickedAlignment = alignment;
    $("button.alignment-button").removeClass("clicked");
    $(this).addClass("clicked");
  });

  $("button.submitButton").click(function(event) {
    event.preventDefault();
    var inputtedName = $("input#new-name").val();
    var inputtedGender = $("input#new-gender").val();
    var inputtedRace = $("input#new-race").val();
    var inputtedClass = $("input#new-class").val();
    var inputtedAlignment = clickedAlignment;
    var newCharacter = new Character(inputtedName, inputtedGender, inputtedRace, inputtedClass, inputtedAlignment);
    $(".new-stat").each(function() {
      var stat = $(this).find("input.stat").val();
      newCharacter.addStats(stat);
    });
    resetForm();
    characterSheet.addCharacter(newCharacter);
    display(characterSheet);
    $("#additional-stats").empty();
  });



});

