'use strict';

var exampleModule = require('../tests/example-module');

describe('Dummy tests', function() {

    it('should be true', function() {
        expect(exampleModule.isGreaterThan(10, 5)).to.be.true;
    });

    it('should be false', function() {
        expect(exampleModule.isGreaterThan(5, 10)).to.be.false;
    });

});
