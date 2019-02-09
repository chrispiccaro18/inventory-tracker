import createUniqueMsg from '../src/functions/create-unique-msg.js';

const test = QUnit.test;

test('if amount is 1 return string: is', function(assert) {
    const input = {
        amount: 1
    };
    const expected = 'is';
    const result = createUniqueMsg(input);
    assert.equal(result, expected);
});

test('if amount is > 1 return string: are', function(assert) {
    const input = {
        amount: 2
    };
    const expected = 'are';
    const result = createUniqueMsg(input);
    assert.equal(result, expected);
});

test('if item is not uniqe add to string: not', function(assert) {
    const input = {
        amount: 2,
        unique: 'no'
    };
    const expected = 'are not';
    const result = createUniqueMsg(input);
    assert.equal(result, expected);
});