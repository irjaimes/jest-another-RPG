
class Potion {
    constructor(name) {
        this.types = ['strength', 'agility', 'health']
        this.name = name || this.types[Math.floor(Math.random() * this.types.length)]

        if (this.name === 'health') {
            this.value = Math.floor(Math.random() * 10 + 30); // number between 30 and 40
        } else {
            this.value = Math.floor(Math.random() * 5 + 7); //number between 5 and 7
        }
    }
}


module.exports = Potion;