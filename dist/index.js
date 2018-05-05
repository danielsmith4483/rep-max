"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formulae = {
    brzycki: [
        {
            expression: function (r) {
                return 36 / (37 - r);
            },
            multiply: true,
        },
    ],
    epley: [
        {
            expression: function (r) {
                return 1 + r / 30;
            },
            multiply: true,
        },
    ],
    lombardi: [
        {
            expression: function (r) {
                return Math.pow(r, 0.10);
            },
            multiply: true,
        },
    ],
    mayhew: [
        {
            expression: function (r) {
                return 100;
            },
            multiply: true,
        },
        {
            expression: function (r) {
                return 52.2 + 41.9 * Math.exp(-0.055 * r);
            },
            multiply: false,
        },
    ],
    mcGlothin: [
        {
            expression: function (r) {
                return 100;
            },
            multiply: true,
        },
        {
            expression: function (r) {
                return 101.3 - 2.67123 * r;
            },
            multiply: false,
        },
    ],
    oConner: [
        {
            expression: function (r) {
                return 1 + r / 40;
            },
            multiply: true,
        },
    ],
    wathan: [
        {
            expression: function (r) {
                return 100;
            },
            multiply: true,
        },
        {
            expression: function (r) {
                return 48.8 + 53.8 * Math.exp(-0.075 * r);
            },
            multiply: false,
        },
    ],
};
/**
 * Returns the estimated One-Rep Max for a given weight and rep count using the Epley formula.
 * @param weight The weight used in the rep max calculation.
 * @param reps The number of reps used in the rep max calculation.
 * @param options Optional parameter conforming to IOptions for supplying additional customization.
 * @returns The estimated One-Rep Max.
 */
function oneRepMax(weight, reps, options) {
    if (weight < 0) {
        throw new RangeError("Negative weight ranges are not allowed.");
    }
    if (reps <= 0) {
        throw new RangeError("Nonpositive rep ranges are not allowed.");
    }
    if (reps === 1) {
        return weight;
    }
    options = options || { formula: "epley" };
    /**
     * Apply each expression for a given formula (e.g. epley) in sequence, either multiplying by or dividing by the
     * current term depending on the value of the multiply property.
     */
    var output = 1;
    for (var _i = 0, _a = formulae[options.formula]; _i < _a.length; _i++) {
        var instruction = _a[_i];
        output *= instruction.multiply ? instruction.expression(reps) : 1.0 / instruction.expression(reps);
    }
    return output * weight;
}
exports.oneRepMax = oneRepMax;
/**
 * Returns the estimated N-Rep Max for a given n, weight, and rep count using the Epley formula.
 * @param n The number of reps for which the N-Rep Max calculation is intended.
 * @param weight The weight used in the rep max calculation.
 * @param reps The number of reps used in the rep max calculation.
 * @param options Optional parameter conforming to IOptions for supplying additional customization.
 * @returns The estimated N-Rep Max.
 */
function nRepMax(n, weight, reps, options) {
    if (n === 1) {
        return oneRepMax(weight, reps, options);
    }
    options = options || { formula: "epley" };
    /**
     * Apply each expression for a given formula (e.g. epley) in sequence, either multiplying by or dividing by the
     * current term depending on the inverse of the value of the multiply property. This inverts the expression for
     * when 1RM and reps are known.
     */
    var output = 1;
    for (var _i = 0, _a = formulae[options.formula]; _i < _a.length; _i++) {
        var instruction = _a[_i];
        output *= instruction.multiply ? 1.0 / instruction.expression(n) : instruction.expression(n);
    }
    return output * oneRepMax(weight, reps, options);
}
exports.nRepMax = nRepMax;
