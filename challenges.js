var score, roundScore, activePlayer, gamePlaying;

init();

var previousDice;

document.querySelector(".btn-roll").addEventListener('click', function(){
    if(gamePlaying){
        //1. Random Number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        //3. update the round score if the rolled number was NOT a 1
        
        if(dice1 !== 1 && dice2 !== 1){
            roundScore += dice1 + dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }else{
            nextPlayer();
        }

        /*
        if(dice === 6 && previousDice === 6){
            score[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = 0;
            nextPlayer();

        }else if(dice !== 1){
            previousDice = dice;
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;

        }else{
            nextPlayer();
        }
        */   
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //1. add current score to global score
        score[activePlayer] += roundScore;

        //2. update the UI
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        var winningScore;
        //undefined, 0, null, and "" are coerced to false
        //anything else is coerced to true
        if(input){
            winningScore = input;
        }else{
            winningScore = 100;
        }

        //3. check if the player won the game
        if(score[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            // Next Player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    score = [0, 0];     
    roundScore = 0;
    activePlayer = 0;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    gamePlaying = true;
}

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;        
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}