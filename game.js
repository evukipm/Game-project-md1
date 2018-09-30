//Game constructor
function Game(word){
    var self = this;

    self.theWord = new Word(word);
    self.lifes = [
        '<span class="green"> "1"</span>',
        '<span class="green"> "2"</span>',
        '<span class="green"> "3"</span>',
        '<span class="green"> "4"</span>',
        '<span class="green"> "5"</span>',
        '<span class="green"> "6"</span>',
        '<span class="green"> "7"</span>',
        '<span class="green"> "8" </span>'    
    ];
    self.hangMan = [
        '<span class="lilac">function</span> <span class="orange">HangMan</span>(){',
    
    ];
    self.letterElement;
    self.lifesArrayElement;
    self.finalResult;
    self.onGameOverCallback;
}

//starts the game
Game.prototype.start = function () {
    var self = this;

    //array the word with an a Word constructor prototype
    self.theWord.toArray(self.theWord.currentWord);

    self.gameDOM = buildDom(`
        <main>
            <div class='lifes-array'></div>
            <div class='game-screen'>
                <div class='hang-man'></div>
                <input class='input-letter' autocomplete='off' maxlength='1' autofocus="autofocus" >
            </div>
            <div class='word-flex'></div>
        </main>
        `)

    document.body.appendChild(self.gameDOM);

    //setup the elements
    self.lifesArrayElement = document.querySelector('.lifes-array');
    self.hangManElement = document.querySelector('.hang-man');
    self.letterElement = document.querySelector('.input-letter');
    
    self.letterElement.focus();
    self.lifesArrayElement.innerHTML = '<span class="lilac">var</span> <span class="blue">lifes</span> <span class="gray">=</span> [' + self.lifes + ']';
    self.letterElement.addEventListener('keypress', function(event){
        if(event.key === 'Enter'){
            self.theWord.validateLetter(self.letterElement.value, self.lifesArrayElement);
        }
    });

    //set letters with an a Word constructor prototype
    self.theWord.setLetters();
}

//check the results for win or lose condition
Game.prototype.checkResults = function(){
    var self = this;

    self.correctLetters = [];
    self.letterDivs.forEach(function(elem){
        if(elem.className === "visible"){
            self.correctLetters.push(elem);
        }
    });

    if(self.lifes.length === 0 ){
        self.finalResult = "lose";
        self.onGameOverCallback(self.finalResult);
    }
    else if(self.correctLetters.length === self.theWord.currentWord.length){
        self.finalResult = "win";
        self.onGameOverCallback(self.finalResult);
    }
}

//callback of game over
Game.prototype.onOver = function (callback) {
    var self = this;
  
    self.onGameOverCallback = callback;
};
  
//destroy game screen
Game.prototype.destroy = function () {
    var self = this;
    
    self.gameDOM.remove();
};