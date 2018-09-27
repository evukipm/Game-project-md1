function Game(word){
    var self = this;

    self.currentWord = word;
    self.lifes = ["'1'", " '2'", " '3'", " '4'", " '5'", " '6'", " '7'", " '8'"];
    self.letter;
    self.letterDivs;
}

Game.prototype.start = function () {
    var self = this;

    self.toArray();

    self.gameDOM = buildDom(`
        <main>
            <nav class='lifes-array'></nav>
            <section class='game-screen'>
                <div class='hang-image'></div>
                <div class='big-input'>
                <input autocomplete='off' maxlength='1' pattern='[A-Za-z]' class='input-letter' />
                </div>
            </section>
            <footer class='word-flex'></footer>
        </main>
        `)

    document.body.appendChild(self.gameDOM);

    self.lifesArray = document.querySelector('.lifes-array');
    self.hangImage = document.querySelector('.hang-image');
    self.letter = document.querySelector('.input-letter');
    self.wordFlex = document.querySelector('.word-flex');

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
    console.log(self.currentWord);
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

    self.letterDivs.forEach(function(div){
        if(letter === div.className){
            div.classList.replace(div.className, "visible")
        }
    });

}