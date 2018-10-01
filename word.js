function Word(word) {
    var self = this;

    self.currentWord = word;
    self.letterDivs;
}

//splits the word introduced in splash
Word.prototype.toArray = function (word){
    var self = this;

    self.currentWord = word.split('');
}

//creates de div letters in the DOM
Word.prototype.setLetters = function (){
    var self = this;

    //selecting the container of the letters
    self.wordFlexElement = document.querySelector('.word-flex');

    //iterates for make one div per letter
    //also, it adds a class in every div with the letter asigned in it
    self.currentWord.forEach(function(letter){
        var div = document.createElement('div');
        var span = document.createElement('span');
        span.innerText = letter;
        div.setAttribute("id", randomColor[Math.floor(Math.random()*randomColor.length)]);
        span.classList.add(letter);
        self.wordFlexElement.appendChild(div);
        div.appendChild(span);
    });

    //select all divs and save it in a node
    self.letterDivs = self.wordFlexElement.querySelectorAll('span');
}