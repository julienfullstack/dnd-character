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
  this.details = []
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

Character.prototype.addDetails = function(detail) {
  this.details.push(detail);
}

// UI logic

// This is a global variable that mocks a database.
var characterSheet = new CharacterSheets();

function showCharacter(id) {
  var character = characterSheet.findCharacter(id);
  $("#show-character").show();
  $(".name").html(character.Name);
  $(".gender").html(character.Gender);
  $(".race").html(character.Race);
  $(".class").html(character.Class);
  $(".alignment").html(character.Alignment);
  // var details = "";
  // character.details.forEach(function(detail) {
  //   details += "<li>" + detail + "</li>";
  // });
  // $("#show-details").html(details);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + character.id + ">Delete</button>");
}

// Below uses event delegation, which is the best practice for click handlers. We are attaching click handlers to different dynamic elements. The parent element must exist when the DOM is loaded. For instance, "ul#characters" exists at that time. Then .on() can be used to dynamically attach a listener to a child element, in this case the "li" inside of "ul#characters".

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

// function appendAddress() {
//   $("#additional-details").append('<div class="new-detail">' +
//                                  '<div class="form-group">' +
//                                    '<label for="detail">Address</label>' +
//                                    '<input type="text" class="form-control detail">' +
//                                  '</div>');
// }

$(document).ready(function() {
  attachCharacterListeners();

  $("form#new-character").submit(function(event) {
    event.preventDefault();

    var inputtedName = $("input#new-name").val();
    var inputtedGender = $("input#new-gender").val();
    var inputtedRace = $("input#new-race").val();
    var inputtedClass = $("input#new-class").val();
    var inputtedAlignment = $("input#new-alignment").val();
    var newCharacter = new Character(inputtedName, inputtedGender, inputtedRace, inputtedClass, inputtedAlignment);
    $(".new-detail").each(function() {
      var detail = $(this).find("input.detail").val();
      newCharacter.addDetails(detail);
    });
    characterSheet.addCharacter(newCharacter);
    display(characterSheet);
    $("#additional-details").empty();
  });

  // $("#add-detail").click(function() {
  //   appendAddress();
  // });
});
