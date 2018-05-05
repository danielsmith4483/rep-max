'use strict';
var expect = require('chai').expect;
var repMax = require('../dist/index.js');

describe('oneRepMax function', () => {
    it("should return a non-negative value", () => {
        expect(repMax.oneRepMax(135, 5)).to.be.at.least(0);
        expect(repMax.oneRepMax(135, 1000)).to.be.at.least(0);
        expect(repMax.oneRepMax(13500, 5)).to.be.at.least(0);
        expect(repMax.oneRepMax(13500, 1000)).to.be.at.least(0);
        expect(repMax.oneRepMax(9999, 9999)).to.be.at.least(0);
    });
    it("should throw a RangeError for negative weights", () => {
        expect(function() {repMax.oneRepMax(-10, 1)}).to.throw(RangeError);
    });
    it("should throw a RangeError for nonpositive reps", () => {
        expect(function() {repMax.oneRepMax(135, 0)}).to.throw(RangeError);
        expect(function() {repMax.oneRepMax(135, -5)}).to.throw(RangeError);
    });
    it("should return the input weight given a rep count of 1", () => {
        var weight = 135;
        var result = repMax.oneRepMax(weight, 1);
        expect(result).to.equal(weight);
    });
    it("should implement the Epley formula for a 1 rep max calculation by default", () => {
        var result = repMax.oneRepMax(100, 6);
        expect(result).to.equal(120);
    });
});

describe('nRepMax function', () => {
    it("should throw a RangeError for negative weights", () => {
        expect(function() {repMax.nRepMax(1, -10, 1)}).to.throw(RangeError);
    });
    it("should throw a RangeError for nonpositive reps", () => {
        expect(function() {repMax.nRepMax(1, 135, 0)}).to.throw(RangeError);
        expect(function() {repMax.nRepMax(1, 135, -5)}).to.throw(RangeError);
    });
    it("should throw a RangeError for nonpositive n", () => {
        expect(function() {repMax.nRepMax(0, 135, 0)}).to.throw(RangeError);
        expect(function() {repMax.nRepMax(-5, 135, 0)}).to.throw(RangeError);
    });
    it("should behave like oneRepMax when n = 1", () => {
        expect(repMax.oneRepMax(135, 5)).to.equal(repMax.nRepMax(1, 135, 5));
        expect(repMax.oneRepMax(135, 1)).to.equal(repMax.nRepMax(1, 135, 1));
        expect(repMax.oneRepMax(0, 5)).to.equal(repMax.nRepMax(1, 0, 5));
        expect(repMax.oneRepMax(225, 25)).to.equal(repMax.nRepMax(1, 225, 25));
    });
    it("should return a different n rep max for different n", () => {
        expect(repMax.nRepMax(2, 135, 5)).to.not.equal(repMax.nRepMax(1, 135, 5));
        expect(repMax.nRepMax(3, 225, 10)).to.not.equal(repMax.nRepMax(5, 225, 10));
    });
    it("should be able to deterministically convert between 1RM and nRM", () => {
        var oneRepMax = repMax.oneRepMax(100, 6);
        var twoRepMax = repMax.nRepMax(2, 100, 6);

        expect(oneRepMax).to.equal(repMax.oneRepMax(twoRepMax, 2));
    });
});