'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      const input = req.query.input;
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);

      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        res.send('invalid number and unit');
      } else if (initNum === 'invalid number') {
        res.send('invalid number');
      } else if (initUnit === 'invalid unit') {
        res.send('invalid unit');
      } else {
        const returnNum = convertHandler.convert(initNum, initUnit);
        const returnUnit = convertHandler.getReturnUnit(initUnit);
        const responseString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

        res.json({
          initNum: initNum,
          initUnit: initUnit,
          returnNum: returnNum,
          returnUnit: returnUnit,
          string: responseString
        });
      }
    });

};