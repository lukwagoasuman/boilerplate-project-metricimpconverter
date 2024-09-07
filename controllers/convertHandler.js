function ConvertHandler() {

  this.getNum = function(input) {
    let result = input.match(/[.\d\/]+/g) || ['1']; // Default to 1 if no number
    result = result[0];

    // Handle fractional input
    if (result.includes('/')) {
      let nums = result.split('/');
      if (nums.length > 2) {
        return 'invalid number'; // Return error for double fraction
      }
      result = parseFloat(nums[0]) / parseFloat(nums[1]);
    }

    return isNaN(result) ? 'invalid number' : parseFloat(result);
  };

  this.getUnit = function(input) {
    const validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    let result = input.match(/[a-zA-Z]+/g);

    if (!result) {
      return 'invalid unit';
    }

    result = result[0].toLowerCase();
    if (result === 'l') result = 'L'; // Handle case sensitivity for 'L'
    
    return validUnits.includes(result) ? result : 'invalid unit';
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };

    return unitMap[initUnit] || 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    const spelledOutUnits = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };

    return spelledOutUnits[unit] || 'invalid unit';
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;

    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = 'invalid unit';
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;