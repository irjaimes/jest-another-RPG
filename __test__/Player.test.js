const { expect } = require('@jest/globals');
const Player = require('../lib/Player.js');

const Potion = require('../lib/Potion');

jest.mock('../lib/Potion');

console.log(new Potion());


test('create a player object', () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    // add logic to test inventory object
    expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));
});