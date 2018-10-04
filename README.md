# Project's name
buildHangMan

## Description
buildHangMan is the classic game of Hangman with a programmer touch. Player one introduce a word in the splash, and player two has to find it letter by letter. Every time you fail, te buildHangMan code makes a new line. If the code arrives to the last bracket, the function executes and you lose. 

If you are an asocial and want to play alone (it's more fun with a friend and even more fun with an enemy) you can do it! Click the randomize button and the game wil choose a word for you.


## MVP (DOM - CANVAS)
I make first in DOM and if it works, I will try to make it in canvas in a more fun version.


## Backlog
I supose that's my canvas idea of a lot bouncing words in the screen.

## Data structure

## main.js
- buildSplash
- destroySplash
- buildGame
- destroyGame
- buildGameOver
- destroyGameOver

## randomword.js
- Array with random words

## game.js
- game constructor
word:
lifes:
letter

- start
build the HTML
restore lives to X
split the word in an array
introduce every letter in HTML (invisible)

- inputValue
recives the letter

- checkLetter
evalue if the letter introduced is inside the array
if it is, show the letter
if it's not, lose one life

- hangMan
recives the lifes
every time you lose a life, hangMan strikes one arrayLife and show one line of code.

- inputRestart
clean the inputeValue

- gameOver
when the word is complete
when the lifes are at 0
if you win show the hangMan alive
if you lose show the hangMan dead

## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen (win or die)
- splashScreen...


## Task
- Create files
- random - array of random words (3 or 4)
- main - build splash
- main - splash dom
- main - event in input and random
- main - destroy splash
- main - call game
- main - build game
- main - game dom
- game - temporice to loose
- game - call gameOver
- main - build gameOver
- main - gameover dom
- main - event to restart and go to splash
- game - constructor game
- game - constructor recives word of splash
- game - function to random word
- game - function to array the word
- game - function to introduce letters in dom
- game - event in input
- game - function to search the letter with conditions
- game - function to lose one life
- game - conditions of losing
- main - lose or win dom


## Links


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/evukipm/Game-project-md1), 
[Link Deploy](https://evukipm.github.io/Game-project-md1)


### Slides
[Link Slides.com](https://slides.com/evukipm/hangman#/)