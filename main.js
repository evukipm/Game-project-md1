
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
    var splashInputButtn; // botón del input del splash
    var randomButton // botón random del splash
    var currentWord;
    var restartButton;
    
    //construcción del splash
    function buildSplash(){

        splashScreen = buildDom(`
            <main id="splash">
                <div id="wrap">
                    <h1><span class="lilac">function</span> <span class="orange">buildHangMan</span>(<span class="blue"> players </span>){</h1>
                    <div class="container">
                        <div class="input">
                        <h2><span class="lilac">if</span> ( <span class="blue">players</span> <span class="gray">===</span> <span class="blue">2</span> <span class="gray">||</span> <span class="blue">players</span> <span class="gray">></span> <span class="blue">2</span> ){</h2>
                            <input class="splashInput red" autofocus="autofocus" placeholder="type a single word" autocomplete="off" />
                            <button class="splashInputButtn blue">Go!</button>
                        <h2>}</h2>
                        <h2><span class="lilac">else if</span> ( <span class="blue">players</span> <span class="gray">===</span> <span class="blue">1</span> ){</h2>
                        </div>
                        <button class="randomizeWord blue">Randomize!</button>
                        <h2>}</h2>
                    </div>
                    <h1>}</h1>
                </div>
            </main>
        `);

        document.body.appendChild(splashScreen);

        splashInput = document.querySelector('.splashInput');
        splashInputButtn = document.querySelector('.splashInputButtn');
        randomButton = document.querySelector('.randomizeWord');
    
        splashInputButtn.addEventListener('click', startGame);
        splashInput.addEventListener('keypress', function(event){
            if(event.key === 'Enter'){
                startGame(splashInput.value);
            }
        });
        randomButton.addEventListener('click', startGame);
        
    }    

    buildSplash();

    function startGame(){
        currentWord = splashInput.value
        if(!splashInput.value){
            currentWord = randomWord[Math.floor(Math.random()*randomWord.length)]
        }
        destroySplash();

        gameScreen = new Game(currentWord);
        gameScreen.start();
        gameScreen.onOver(gameOver);
        
    }

    function destroySplash(){
        splashInputButtn.removeEventListener('click', startGame);
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
            <main>
                <h1>Sorry</h1>
                <button class="restart-button">Play again!</button>
            </main>
            `);
        }
        if(result === "win"){
            finalScreen = buildDom(`
            <main>
                <h1>Congrats</h1>
                <button class="restart-button">Play again!</button>
            </main>
            `);
        }

        document.body.appendChild(finalScreen);

        restartButton = document.querySelector('.restart-button');

        restartButton.addEventListener('click', restartGame)
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