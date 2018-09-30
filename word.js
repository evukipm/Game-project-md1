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
        div.innerText = letter;
        div.classList.add(letter, randomColor[Math.floor(Math.random()*randomColor.length)]);
        self.wordFlexElement.appendChild(div);
    });

    //select all divs and save it in a node
    self.letterDivs = self.wordFlexElement.querySelectorAll('div');
}

//iterates in divs of word searching for matches
Word.prototype.validateLetter = function(letter, lifes){
    var self = this;
    var winValue = false;

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
        lifes.pop();
        lifes.innerHTML = '<span class="lilac">var</span> <span class="blue">lifes</span> <span class="gray">=</span> [' + self.lifes + ']';
    }
    
    //check the total
    self.checkResults();

    //clear the input
    self.inputElement.value = "";
}