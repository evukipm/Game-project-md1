//Game constructor
function Game(currentWord){
    var self = this;

    //constructor game scopes
    self.theWord = new Word(currentWord);
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
    self.theWord.toArray(self.theWord.currentWord);

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
    self.theWord.setLetters();
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
            self.theWord.validateLetter(self.inputElement.value);
        }
    });
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