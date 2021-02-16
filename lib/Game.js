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

Game.prototype.startNewBattle = function () {
    // establish who's turn it is based on agility values
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }

    console.log('Your stats are as follows:');
    console.table(this.player.getStats());

    console.log(this.currentEnemy.getDescription());

    this.battle();
};

Game.prototype.battle = function () {
    if (this.isPlayerTurn) {
        // player prompts will go here
        // prompt user to attack or use a Potion
        inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            .then(({ action }) => {
                // if using potion 
                if (action === 'Use potion') {
                    // if Player has no potions
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions!");
                        return;
                    }
                    // display list of Potion objects to user
                    inquirer
                        .prompt({
                            type: 'list',
                            message: 'Which potion would you like to use?',
                            name: 'action',
                            // inquierer returns string values. Instead populate choices array with strings that contains the Potion name and index. 
                            // add index as parameter and add 1 so not to confuse Player with index 0.
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        // then removed that index when used.
                        .then(({ action }) => {
                            const potionDetails = action.split(': ');

                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);
                        });
                    // apply selected Potion effect to player
                }
                // if attacking
                else {
                    // subtract health from the Enemy based on Player attack value
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());
                }
            });

    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
    }
};



// If Enemy turn
// subtract health from the Player based on Enemy attak value


module.exports = Game;
