//Game constructor
function Game(word){
    var self = this;

    //constructor scopes
    self.currentWord = word;
    self.lifes = ["'1'",  " '2'", " '3'", " '4'", " '5'", " '6'", " '7'", " '8'"];
    self.inputElement;
    self.letterDivs;
    self.finalResult;
    self.onGameOverCallback;
}

//starts the game
Game.prototype.start = function () {
    var self = this;

    //takes the word and transforms in to array
    self.toArray(self.currentWord);

    //builds the game DOM
    self.gameDOM = buildDom(`
        <main>
            <div class='lifes-array'></div>
            <div class='letters-used'><span>Used: </span></div>
            <div class='game-screen'>
                <div class='hang-image'></div>
                <input class='input-letter' autocomplete='off' maxlength='1' autofocus="autofocus" >
            </div>
            <div class='word-flex'></div>
        </main>
        `)

    //place the DOM
    document.body.appendChild(self.gameDOM);

    //setup the elements
    self.setupElements();

    //place the array of letters in word-flex div
    self.setLetters();
}

//Selectors and events in elements
Game.prototype.setupElements = function(){
    var self = this;

    self.lifesArrayElement = document.querySelector('.lifes-array');
    self.hangImageElement = document.querySelector('.hang-image');
    self.inputElement = document.querySelector('.input-letter');
    self.wordFlexElement = document.querySelector('.word-flex');
    self.lettersUsedElement = document.querySelector('.letters-used')
    
    self.inputElement.focus();
    self.inputElement.pattern = "[1-3]";

    self.lifesArrayElement.innerText = 'var lifes = [' + self.lifes + ']';
    self.inputElement.addEventListener('keypress', function(event){
        if(event.key === 'Enter'){
            self.validateLetter(self.inputElement.value);
        }
    });
}

//splits the word introduced in splash
Game.prototype.toArray = function (word){
    var self = this;

    self.currentWord = word.split('');
}

//creates de div letters in the DOM
Game.prototype.setLetters = function (){
    var self = this;

    //iterates for make one div per letter
    //also, it adds a class in every div with the letter asigned in it
    self.currentWord.forEach(function(letter){
        var div = document.createElement('div');
        div.innerText = letter;
        div.classList.add(letter);
        self.wordFlexElement.appendChild(div);
    });

    //select all divs and save it in a node
    self.letterDivs = self.wordFlexElement.querySelectorAll('div');
}

//function to check the letter introduced with the word
Game.prototype.validateLetter = function(letter){
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

//cheking the results
Game.prototype.checkResults = function(){
    var self = this;

    //set correctLetters array to empty
    self.correctLetters = [];

    //iterates in divs of word cheking if it's all in visible
    self.letterDivs.forEach(function(elem){
        if(elem.className === "visible"){
            self.correctLetters.push(elem);
        }
    });

    //if it's all visible, you win! :)
    if(self.correctLetters.length === self.currentWord.length){
        self.finalResult = "win";
        self.onGameOverCallback(self.finalResult);
    }

    //but if you lose all lifes, you lose :(
    else if(self.lifes.length === 0 ){
        self.finalResult = "lose";
        //self.onGameOverCallback(self.finalResult);
        self.letterDivs.forEach(function(elem){
        elem.classList.add('visible');
        })
    }
}

//Game over callback
Game.prototype.onOver = function (callback) {
    var self = this;
  
    self.onGameOverCallback = callback;
};
  
//destroy game
Game.prototype.destroy = function () {
    var self = this;
    
    self.gameDOM.remove();
};