'use strict';
var expect = require('chai').expect;
var repMax = require('../dist/index.js');

describe('repMax function', () => {
    it("should return a non-negative value", () => {
        var result = repMax.repMax(135, 5);
        expect(result).to.be.at.least(0);
    });
});