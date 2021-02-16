const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy; // enemy and player are undefined in Game object. 
    this.player;       // they will be defined when the method to initialize game is called.
}

// this is where we set up Enemy and Player
Game.prototype.initializeGame = function () {
    // initialize Enemy data
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    this.currentEnemy = this.enemies[0];

    // add inquirer prompt to get user input
    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        // destructure name from the prompt object
        .then(({ name }) => {
            this.player = new Player(name);

            // call new battle
            this.startNewBattle();
        });
};



module.exports = Game;
