
//building Dom function
function buildDom(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
}

//declaring main
function main(){

    var splashScreen; //screen of splash
    var gameScreen; //Screen of game
    var finalScreen; //GameOver lose screen
    
    var splashInput; //input del splash
    var randomButton // botón random del splash
    var currentWord;
    var itsRandom = false;
    var restartButton;
    
    //construcción del splash
    function buildSplash(){

        splashScreen = buildDom(`
            <main id="splash">
                <div id="wrap">
                    <h1><span class="orange">buildHangMan</span></h1>
                    <div class="container">
                        <div class="input">
                            <form>
                            <input class="splash-input green" autofocus="autofocus" placeholder="type a single word" type="text"  pattern="[A-Za-z]{3,9}" />
                            </form>
                            <p>Input a word between 3 and 9 characters and press enter</p>
                        </div>
                        <h2>or</h2>
                        <button class="randomize-word blue">Randomize!</button>
                    </div>
                </div>
            </main>
        `);

        document.body.appendChild(splashScreen);

        splashInput = document.querySelector('.splash-input');
        randomButton = document.querySelector('.randomize-word');

        splashInput.focus();
    
        splashInput.addEventListener('keypress', function(event){
            if(event.key === 'Enter'){
                if(splashInput.validity.valid){
                    startGame(splashInput.value);
                }else{
                    splashInput.classList.add("apply-shake");

                    window.setTimeout(function(){
                        splashInput.classList.remove("apply-shake");
                    }, 1000)
                }
            }
        });

        randomButton.addEventListener('click', startGame);
        
    }    

    buildSplash();

    function startGame(){
        currentWord = splashInput.value

        if(!currentWord){
            currentWord =  randomWord[Math.floor(Math.random()*randomWord.length)];
            itsRandom = true;
        }

        destroySplash();

        gameScreen = new Game(currentWord, itsRandom);
        gameScreen.start();
        gameScreen.onOver(gameOver);
        
    }

    function destroySplash(){
        randomButton.removeEventListener('click', startGame);

        splashScreen.remove();
    }

    function gameOver(result) {
        destroyGame();
        buildGameOver(result);
    }

    function destroyGame() {
        gameScreen.destroy();
    }

    function buildGameOver(result){
        if(result === "lose"){
            finalScreen = buildDom(`
            <main id="game-over">
                <h1 class="red">Sorry</h1>
                <div class="dino-lose">
                <img src="images/trexlose.png">
                </div>
                <button class="restart-button blue">Play again!</button>
            </main>
            `);
        }
        if(result === "win"){
            finalScreen = buildDom(`
            <main id="game-over">
                <h1 class="green">Congrats</h1>
                <button class="restart-button blue">Play again!</button>
            </main>
            `);
        }

        document.body.appendChild(finalScreen);

        restartButton = document.querySelector('.restart-button');

        restartButton.focus();

        restartButton.addEventListener('click', restartGame);
        restartButton.addEventListener('keypress', function(event){
            if(event.key === 'Enter'){
                restartGame();
            }
        });
    }

    function restartGame(){
        restartButton.removeEventListener('click', restartGame);
        destroyGameOver();
        buildSplash();
    }

    function destroyGameOver() {
        finalScreen.remove();
    }
}

//Calling main on load
window.addEventListener('load', main);