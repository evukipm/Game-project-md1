//Game constructor
function Game(word){
    var self = this;


    self.theWord = new Word(word);

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

    self.inputElement;
    self.letterDivs;
    self.finalResult;
    self.usedLetters;
    self.failedLetters = [];
    self.hangmanCount = 0;
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
                <input class="input-letter" autocomplete="off" maxlength="1" autofocus="autofocus" type="text" pattern="[A-Za-z]" />
            </div>
            <div class="game-screen">
                <div class="hang-man"></div>
                <div class="word-flex"></div>
            </div>
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
    
    self.hangManElement = document.querySelector('.hang-man');
    self.inputElement = document.querySelector('.input-letter');
    self.usedLetters = document.querySelector('.letters-used')

    self.inputElement.focus();
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
        }, 5000)
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