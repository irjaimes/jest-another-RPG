
const Potion = require('../lib/Potion.js');

// creates health potion
test('creates a health potion object', () => {
    // keyword `new` will create new Potion objects.
    const potion = new Potion('health');
    // we specify that potion object will have a property name of health with value of some number
    expect(potion.name).toBe('health');
    expect(potion.value).toEqual(expect.any(Number));
});

// creates random potion
test('creates a random potion object', () => {
    // random potion so call without arguments
    const potion = new Potion();

    expect(potion.name).toEqual(expect.any(String));
    expect(potion.name.length).toBeGreaterThan(0);
    expect(potion.value).toEqual(expect.any(Number));
});