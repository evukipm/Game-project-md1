function Word(word) {
    var self = this;

    self.currentWord = word;
}

//splits the word introduced in splash
Word.prototype.toArray = function (word){
    var self = this;

    self.currentWord = word.split('');
}

//creates de div letters in the DOM
Word.prototype.setLetters = function (){
    var self = this;

    //iterates for make one div per letter
    //also, it adds a class in every div with the letter asigned in it
    self.currentWord.forEach(function(letter){
        var div = document.createElement('div');
        div.innerText = letter;
        div.classList.add(letter);
        Game.self.wordFlexElement.appendChild(div);
    });

    //select all divs and save it in a node
    self.letterDivs = self.wordFlexElement.querySelectorAll('div');
}

//function to check the letter introduced with the word
Word.prototype.validateLetter = function(letter){
    var self = this;
    var winValue = false;

    //iterates in divs of word searching for matches

    //if it match, make the letter visible with a class
    self.letterDivs.forEach(function(div){
        if(letter === div.className){
            div.classList.replace(div.className, "visible")
            winValue = true;
        }
    });

    //if it does not match, you lose one life
    //also, it creates a div in "used words" container
    if(winValue === false){
        self.lifes.pop();
        self.lifesArrayElement.innerText = 'var lifes = [' + self.lifes + ']';

        var div = document.createElement('div');
        div.innerText = letter;
        self.lettersUsedElement.appendChild(div);
    }

    //check the total
    self.checkResults();

    //clear the input
    self.inputElement.value = "";
}