//Game constructor
function Game(word, itsRandom){
    var self = this;

    //atributes
    self.theWord = new Word(word, itsRandom);
    self.itsRandom = itsRandom;
    self.word = word;

    self.hangMan = [
        '<img src="images/hangman1.png">',
        '<img src="images/hangman2.png">',
        '<img src="images/hangman3.png">',
        '<img src="images/hangman4.png">',
        '<img src="images/hangman5.png">',
        '<img src="images/hangman6.png">',
        '<img src="images/hangman7.png">',
        '<img src="images/hangman8.png">',
        '<img src="images/hangman9.png">',
        '<img src="images/hangman10.png">',
    ];

    //elements
    self.inputElement;
    self.letterDivs;
    self.clueElement;
    self.timeElement;

    //counters
    self.finalResult = "lose";
    self.usedLetters;
    self.timeCounter = 15;
    self.failedLetters = [];
    self.hangmanCount = 0;

    //Callbacks
    self.onGameOverCallback;
}

//starts the game
Game.prototype.start = function () {
    var self = this;

    //array the word with an a Word constructor prototype
    self.theWord.toArray(self.theWord.currentWord);

    self.gameDOM = buildDom(`
        <main id="game">
            <div class="container">
                <div class="letters-used"></div>
                <div class="time-counter"></div>
                <input class="input-letter" autocomplete="off" maxlength="1" autofocus="autofocus" type="text" pattern="[A-Za-z]" />
            </div>
            <div class="game-screen">
                <div class="hang-man"></div>
                <div class="word">
                <div class="word-flex"></div>
                <p class="clue"></p>
                </div>
            </div>
            <button class="clue-button red">Clue!</button>
        </main>
        `)

    document.body.appendChild(self.gameDOM);

    //setup the elements
    self.setupElements();

    //set letters with an a Word constructor prototype
    self.theWord.setLetters();

    //set the time
    //self.setCounter(self.timeCounter);
}

//setup the elements
Game.prototype.setupElements = function(){
    var self = this;
    
    self.hangManElement = document.querySelector('.hang-man');
    self.inputElement = document.querySelector('.input-letter');
    self.usedLetters = document.querySelector('.letters-used');
    self.clueElement = document.querySelector(".clue");
    self.clueButtonElement = document.querySelector(".clue-button");
    //self.timeElement = document.querySelector(".time-counter");

    if(self.itsRandom){
        self.clueButtonElement.style.display = "inline";
        self.clueButtonElement.addEventListener('click', function(){
            self.displayClue();
        });
    }

    self.inputElement.focus();
    //self.timeElement.innerText = self.timeCounter;
    self.hangManElement.innerHTML = self.hangMan[self.hangmanCount];
    self.inputElement.addEventListener('keypress', function(event){
        if(event.key === 'Enter'){
            if(self.inputElement.validity.valid){
            self.validateLetter(self.inputElement.value);
            }else{
                self.inputElement.classList.add("apply-shake");

                window.setTimeout(function(){
                    self.inputElement.classList.remove("apply-shake");
                }, 1000)
            }
        }
    });
}

//start the time counter
Game.prototype.setCounter = function(time){
    var self = this;

    self.intervalId = setInterval(function(){
        time--
        self.timeElement.innerText = time;
        if(!time){
            self.onGameOverCallback(self.finalResult);
        }
    }, 1000);

}
Game.prototype.clearCounter = function(){
    var self = this;
    clearInterval(self.intervalId);
}

//display clue if it's random
Game.prototype.displayClue = function(){
    var self = this;

    self.clueElement.innerText = self.word.clue;
}

//chalk sounds
Game.prototype.chalkLine = function () {
    self.lineSound = new Audio('sounds/line.mp3')
       self.lineSound.play()
}
Game.prototype.chalkWord = function () {
    self.chalk = new Audio('sounds/word.mp3')
       self.chalk.play()
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
            self.chalkWord();
            //self.clearCounter();
            //self.setCounter(self.timeCounter);
        }
    });

    //if it does not match, you lose one life
    //also, it creates a div in "used words" container
    if(winValue === false){

        //but first we have to check if you used before
        var letterInUse = false;

        self.failedLetters.find(function(elem){
            if(elem === letter){
                letterInUse = true;
                self.inputElement.classList.add("apply-shake");
    
                window.setTimeout(function(){
                    self.inputElement.classList.remove("apply-shake");
                }, 1000)
            }
        });

        
        if(letterInUse === false){
            window.setTimeout(function(){
                self.hangmanCount ++
                self.hangManElement.innerHTML = self.hangMan[self.hangmanCount];
                
                self.chalkLine();
            }, 600);

            window.setTimeout(function(){
                self.failedLetters.push(letter);
                self.usedLetters.innerHTML = self.failedLetters.join(' '); 
            }, 300);
            
        }
        
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

    if(self.hangmanCount === 8){
        self.finalResult = "lose";

        self.theWord.letterDivs.forEach(function(elem){
            window.setTimeout(function(){
                elem.classList.add("visible");
            }, 500)            
        });
        
        window.setTimeout(function (){
            self.onGameOverCallback(self.finalResult);  
        }, 3000)
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