function Game(word){
    var self = this;

    self.currentWord = word;
    self.lifes = ["'1'",  " '2'", " '3'", " '4'", " '5'", " '6'", " '7'", " '8'"];
    self.letter;
    self.letterDivs;
    self.finalResult;
    self.onGameOverCallback;
}

Game.prototype.start = function () {
    var self = this;

    self.toArray();

    self.gameDOM = buildDom(`
        <main>
            <div class='lifes-array'></div>
            <div class='game-screen'>
                <div class='hang-image'></div>
                <input class='input-letter' autocomplete='off' maxlength='1' autofocus="autofocus" >
            </div>
            <div class='word-flex'></div>
        </main>
        `)

    document.body.appendChild(self.gameDOM);

    self.lifesArray = document.querySelector('.lifes-array');
    self.hangImage = document.querySelector('.hang-image');
    self.letter = document.querySelector('.input-letter');
    self.wordFlex = document.querySelector('.word-flex');
    
    self.letter.focus();
    self.letter.pattern = "[1-3]";
    self.lifesArray.innerText = 'var lifes = [' + self.lifes + ']';
    self.letter.addEventListener('keypress', function(event){
        if(event.key === 'Enter'){
            self.validateLetter(self.letter.value);
        }
    });

    self.setLetters();
}

Game.prototype.toArray = function (){
    var self = this;
    self.currentWord = self.currentWord.split('');
}

Game.prototype.setLetters = function (){
    var self = this;
    self.currentWord.forEach(function(letter){
        var div = document.createElement('div');
        div.innerText = letter;
        div.classList.add(letter);
        self.wordFlex.appendChild(div);
    });

    self.letterDivs = self.wordFlex.querySelectorAll('div');
}

Game.prototype.validateLetter = function(letter){
    var self = this;
    var winValue = false;

    self.letterDivs.forEach(function(div){
        if(letter === div.className){
            div.classList.replace(div.className, "visible")
            winValue = true;
        }
    });
    if(winValue === false){
        self.lifes.pop();
        self.lifesArray.innerText = 'var lifes = [' + self.lifes + ']';
    }

    self.checkResults();
}

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
    else if(self.correctLetters.length === self.currentWord.length){
        self.finalResult = "win";
        self.onGameOverCallback(self.finalResult);
    }
}

Game.prototype.onOver = function (callback) {
    var self = this;
  
    self.onGameOverCallback = callback;
};
  
Game.prototype.destroy = function () {
    var self = this;
    
    self.gameDOM.remove();
};