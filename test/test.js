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

describe("formulae", () => {
    const precision = 0.01;

    it("should still use the provided formula when it falls back on oneRepMax", () => {
        const options = {formula: "brzycki"}
        expect(repMax.nRepMax(1, 100, 6, options)).to.be.closeTo(116.129032, precision);
    });
    it("should implement the Epley formula", () => {
        const options = {formula: "epley"}
        expect(repMax.oneRepMax(100, 6, options)).to.equal(120);
        expect(repMax.nRepMax(2, 100, 6, options)).to.equal(112.5);
    });
    it("should implement the Brzycki formula", () => {
        const options = {formula: "brzycki"}
        expect(repMax.oneRepMax(100, 6, options)).to.be.closeTo(116.129032, precision);
        expect(repMax.nRepMax(2, 100, 6, options)).to.be.closeTo(112.903226, precision);
    });
    it("should implement the McGlothin formula", () => {
        const options = {formula: "mcGlothin"}
        expect(repMax.oneRepMax(100, 6, options)).to.be.closeTo(117.270936, precision);
        expect(repMax.nRepMax(2, 100, 6, options)).to.be.closeTo(112.530305, precision);
    });
    it("should implement the Lombardi formula", () => {
        const options = {formula: "lombardi"}
        expect(repMax.oneRepMax(100, 6, options)).to.be.closeTo(119.62312, precision);
        expect(repMax.nRepMax(2, 100, 6, options)).to.be.closeTo(111.612318, precision);
    });
    it("should implement the Mayhew et al. formula", () => {
        const options = {formula: "mayhew"}
        expect(repMax.oneRepMax(100, 6, options)).to.be.closeTo(121.472876, precision);
        expect(repMax.nRepMax(2, 100, 6, options)).to.be.closeTo(109.004232, precision);
    });
    it("should implement the O'Conner et al. formula", () => {
        const options = {formula: "oConner"}
        expect(repMax.oneRepMax(100, 6, options)).to.be.closeTo(115, precision);
        expect(repMax.nRepMax(2, 100, 6, options)).to.be.closeTo(109.52381, precision);
    });
    it("should implement the Wathan formula", () => {
        const options = {formula: "wathan"}
        expect(repMax.oneRepMax(100, 6, options)).to.be.closeTo(120.33058, precision);
        expect(repMax.nRepMax(2, 100, 6, options)).to.be.closeTo(114.441709, precision);
    });
});