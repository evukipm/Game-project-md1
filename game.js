//Game constructor
function Game(word){
    var self = this;


    self.theWord = new Word(word);
    self.lifes = [
        '<img src="images/corazon.jpg">',
        '<img src="images/corazon.jpg">',
        '<img src="images/corazon.jpg">',
        '<img src="images/corazon.jpg">',
        '<img src="images/corazon.jpg">',
        '<img src="images/corazon.jpg">',
    ];
    self.hangMan = [
        '<span class="lilac">function</span> <span class="orange">HangMan</span>(){',
    
    ];
    self.inputElement;
    self.lifesArrayElement;
    self.letterDivs;
    self.finalResult;
    self.usedLetters;
    self.onGameOverCallback;
}

//starts the game
Game.prototype.start = function () {
    var self = this;

    //array the word with an a Word constructor prototype
    self.theWord.toArray(self.theWord.currentWord);

    self.gameDOM = buildDom(`
        <main>
            <div class="lifes-array red"></div>
            <div class="letters-used"><span class="blue">usedLetters</span> <span class="gray">=</span></div>
            <div class="game-screen">
                <div class="hang-man"><canvas></canvas></div>
                <input class="input-letter" autocomplete="off" maxlength="1" autofocus="autofocus" type="text" pattern="[A-Za-z]" />
            </div>
            <div class="word-flex"></div>
        </main>
        `)

    document.body.appendChild(self.gameDOM);

    //setup the elements
    self.setupElements();

    //set letters with an a Word constructor prototype
    self.theWord.setLetters();
}

//setup the elements
Game.prototype.setupElements = function(){
    var self = this;
    
    self.lifesArrayElement = document.querySelector('.lifes-array');
    self.hangManElement = document.querySelector('.hang-man');
    self.inputElement = document.querySelector('.input-letter');
    self.usedLetters = document.querySelector('.letters-used')

    self.inputElement.focus();
    self.lifesArrayElement.innerHTML = self.lifes.join(' ');
    self.inputElement.addEventListener('keypress', function(event){
        if(event.key === 'Enter'){
            if(self.inputElement.validity.valid){
            self.validateLetter(self.inputElement.value);
            }
        }
    });
    
}

//iterates in divs of word searching for matches
Game.prototype.validateLetter = function(letter){
    var self = this;
    var winValue = false;

    //if it match, make the letter visible with a class
    self.theWord.letterDivs.forEach(function(div){
        if(letter === div.className){
            div.classList.replace(div.className, "visible")
            winValue = true;
        }
    });

    //if it does not match, you lose one life
    //also, it creates a div in "used words" container
    if(winValue === false){
        var span = document.createElement('span');
        span.innerText = letter;
        self.usedLetters.appendChild(span);
        self.lifes.pop();
        self.lifesArrayElement.innerHTML = self.lifes.join(' ');
    }
    
    //check the total
    self.checkResults();

    //clear the input
    self.inputElement.value = "";
}

//check the results for win or lose condition
Game.prototype.checkResults = function(){
    var self = this;

    self.correctLetters = [];
    self.theWord.letterDivs.forEach(function(elem){
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