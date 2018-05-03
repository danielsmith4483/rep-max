'use strict';
var expect = require('chai').expect;
var repMax = require('../dist/index.js');

describe('repMax function', () => {
    it("should return a non-negative value", () => {
        var result = repMax.repMax(135, 5);
        expect(result).to.be.at.least(0);
    });
    it("should return the input weight given a rep count of 1", () => {
        var weight = 135;
        var result = repMax.repMax(weight, 1);
        expect(result).to.equal(weight);
    })
});