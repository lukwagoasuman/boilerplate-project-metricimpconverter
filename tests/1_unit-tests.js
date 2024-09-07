const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  test('convertHandler should correctly read a whole number input', function() {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  test('convertHandler should correctly read a decimal number input', function() {
    assert.equal(convertHandler.getNum('32.5L'), 32.5);
  });

  test('convertHandler should correctly read a fractional input', function() {
    assert.equal(convertHandler.getNum('1/2L'), 0.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function() {
    assert.equal(convertHandler.getNum('5.4/3L'), 1.8);
  });

  test('convertHandler should correctly return an error on a double-fraction', function() {
    assert.equal(convertHandler.getNum('3/2/3L'), 'invalid number');
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    assert.equal(convertHandler.getNum('L'), 1);
  });

  test('convertHandler should correctly read each valid input unit', function() {
    const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    inputUnits.forEach(unit => {
      assert.equal(convertHandler.getUnit(`10${unit}`), unit);
    });
  });

  test('convertHandler should correctly return an error for an invalid input unit', function() {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
  });

  test('convertHandler should return the correct return unit for each valid input unit', function() {
    const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const returnUnits = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
    inputUnits.forEach((unit, i) => {
      assert.equal(convertHandler.getReturnUnit(unit), returnUnits[i]);
    });
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
    const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const spelledOutUnits = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
    inputUnits.forEach((unit, i) => {
      assert.equal(convertHandler.spellOutUnit(unit), spelledOutUnits[i]);
    });
  });

  test('convertHandler should correctly convert gal to L', function() {
    assert.equal(convertHandler.convert(5, 'gal'), 18.92705);
  });

  test('convertHandler should correctly convert L to gal', function() {
    assert.equal(convertHandler.convert(18.92705, 'L'), 5);
  });

  test('convertHandler should correctly convert mi to km', function() {
    assert.equal(convertHandler.convert(3, 'mi'), 4.82802);
  });

  test('convertHandler should correctly convert km to mi', function() {
    assert.equal(convertHandler.convert(5, 'km'), 3.10686);
  });

  test('convertHandler should correctly convert lbs to kg', function() {
    assert.equal(convertHandler.convert(10, 'lbs'), 4.53592);
  });

  test('convertHandler should correctly convert kg to lbs', function() {
    assert.equal(convertHandler.convert(5, 'kg'), 11.02312);
  });

});