const Character = require('./Character');
const Potion = require('../lib/Potion');

// set name to empty string until name is provided in command line
class Player extends Character {
    constructor(name = '') {
        // call parent constructor here:
        super(name);

        this.inventory = [new Potion('health'), new Potion()];
    }

    // returns an object with various player properties
    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    }

    // returns the inventory array or false if empty
    getInventory() { // new player objects inherit this method
        if (this.inventory.length) {
            return this.inventory;
        }
        return false;
    };

    addPotion(potion) {
        this.inventory.push(potion); // add potion variable to array
    };


    usePotion(index) {
        // the original inventory array has a single Potion removed with splice, at the specific index and is put into the removed itesm array. 
        // then, the Potion at index [0] of this removed items array is saved in a potion veriable
        const potion = this.getInventory().splice(index, 1)[0];

        switch (potion.name) {
            case 'agility':
                this.agility += potion.value;
                break;
            case 'health':
                this.health += potion.value;
                break;
            case 'strength':
                this.strength += potion.value;
                break;
        }
    }
};

module.exports = Player;
