'use strict';
var expect = require('chai').expect;
var repMax = require('../dist/index.js');

describe('repMax function', () => {
    it("should return a non-negative value", () => {
        var result = repMax.repMax(135, 5);
        expect(result).to.be.at.least(0);
    });
    it("should throw a RangeError for negative weights", () => {
        expect(function() {repMax.repMax(-10, 1)}).to.throw(RangeError);
    });
    it("should throw a RangeError for nonpositive reps", () => {
        expect(function() {repMax.repMax(135, 0)}).to.throw(RangeError);
    });
    it("should return the input weight given a rep count of 1", () => {
        var weight = 135;
        var result = repMax.repMax(weight, 1);
        expect(result).to.equal(weight);
    });
    it("should implement the Epley formula for a 1 rep max calculation by default", () => {
        var result = repMax.repMax(100, 6);
        expect(result).to.equal(120);
    });
});