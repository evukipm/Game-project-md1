function Game(word){
    var self = this;

    self.currentWord = word;
    self.lifes = ["'1'", " '2'", " '3'", " '4'", " '5'", " '6'", " '7'", " '8'"];
    self.letter;
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
                <input class='input-letter' />
                </div>
            </section>
            <footer class='word-flex'></footer>
        </main>
        `)

    document.body.appendChild(self.gameDOM);

    self.lifesArray = document.querySelector('.lifes-array');
    self.hangImage = document.querySelector('.hang-image');
    self.letter = document.querySelector('.input-leter');
    self.wordFlex = document.querySelector('.word-flex');

    self.lifesArray.innerText = 'var lifes = [' + self.lifes + ']';
    self.letter.addEventListener('keypress', validateLetter);

    self.setLetters();
}

Game.prototype.toArray = function (){
    var self = this;
    self.currentWord = self.currentWord.split('');
    console.log(self.currentWord);
}

Game.prototype.setLetters = function (){
    var self =this;

    self.currentWord.forEach(function(letter){
        var div = document.createElement('div');
        div.innerText = letter;
        div.setAttribute('coincide', letter);
        self.wordFlex.appendChild(div);

    });
}

Game.prototype.validateLetter = function(){
    var timeout= setTimeout

}