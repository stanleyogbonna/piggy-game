/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's 
turn. (Hint: Always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where players can set the winning score, so that they can change the
predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. 
This is a good oportunity to use google to figure this out :)

3. Add another dice to the game, so that there are two dices now. The player looses his current score
when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the 
CSS code for the first one.)
*/

// Setting the initial variables
let scores, roundScore, activePlayer, gamePlaying, previousDice, input;


// The Initialization FUNCTION
init();

/** Using the Dom and Event Listener to get access to the btn-roll class element */
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //1. Random Number
        let dice1 = Math.floor(6 * Math.random()) + 1;
        let dice2 = Math.floor(6 * Math.random()) + 1;

        // 2. Display the result
        let domDice = document.querySelector('.dice');
        domDice.style.display = 'block';
        domDice.src = 'dice-' + dice1 + '.png';

        let domDiceSecond = document.querySelector('.dice-extra');
        domDiceSecond.style.display = 'block';
        domDiceSecond.src = 'dice-' + dice2 + '.png'; 

        // Update the round score if the rolled number was not 1
        if(dice1 !== 1 && dice2 !== 1){
            // Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player
            nextPlayer();
        }


    }      
});

/** Using the Dom and Event Listener to get access to the btn-hold class element */
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
         //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // UPDATE the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        let winningScore;
        input = document.querySelector('.set-target').value;

        // Anything empty string, 0, null, undefined etc is coerced to falsy.
        // others are coerced to true
        if(input){
            winningScore = input;
        } else{
            winningScore = 100;
        }
        

        // Check IF player won the game
        if(scores[activePlayer] >=  winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        } else {
            // Next player
            nextPlayer();
        }
    }
});

/** Using the Dom and Event Listener to get access to the btn-new class element */
document.querySelector('.btn-new').addEventListener('click', init);


function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    /* Set all scores to zero as soon as the page gets reloaded */
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';

    /** Set the dice display to none as soon as the page gets reloaded */
    hideDice();

    input = document.querySelector('.set-target').value = '';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');


}

function nextPlayer(){
    // Next Player
    roundScore = 0;
    hideDice();
    document.getElementById('current-' + activePlayer).textContent = 0;
    /* document.getElementById('current-1').textContent = 0; */
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function hideDice() {
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-extra').style.display = 'none';
}