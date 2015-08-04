'use strict';

/**
 * A dummy function to test code coverage.
 *
 * NOTE: This is deliberately verbose for
 * testing purposes.
 *
 * @return {Number}
 */
function isGreaterThan(valueA, valueB) {
    var returnValue;

    if (valueA > valueB) {
        returnValue = true;
    } else {
        returnValue = false;
    }

    return returnValue;
}

module.exports = {
    isGreaterThan: isGreaterThan
};