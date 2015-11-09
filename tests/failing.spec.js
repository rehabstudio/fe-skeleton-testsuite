'use strict';

var exampleModule = require('./example-module');

describe('Failing tests', function() {

    it('should fail', function() {
        expect(exampleModule.isGreaterThan(1, 100)).to.be.true;
    });

});
