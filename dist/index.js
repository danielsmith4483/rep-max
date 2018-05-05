"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The Epley formula, defined as 1RM = w(1 + r/30).
 */
var epley = [
    {
        expression: function (r) {
            return 1 + r / 30;
        },
        multiply: true,
    },
];
/**
 * Returns the estimated rep max for a given weight and rep count using the Epley formula.
 * @param weight The weight used in the rep max calculation.
 * @param reps The number of reps used in the rep max calculation.
 * @returns The estimated rep max.
 */
function oneRepMax(weight, reps) {
    if (weight < 0) {
        throw new RangeError("Negative weight ranges are not allowed.");
    }
    if (reps <= 0) {
        throw new RangeError("Nonpositive rep ranges are not allowed.");
    }
    if (reps === 1) {
        return weight;
    }
    /**
     * Apply each expression for a given formula (e.g. epley) in sequence, either multiplying by or dividing by the
     * current term depending on the value of the multiply property.
     */
    var output = 1;
    for (var _i = 0, epley_1 = epley; _i < epley_1.length; _i++) {
        var instruction = epley_1[_i];
        output *= instruction.multiply ? instruction.expression(reps) : 1.0 / instruction.expression(reps);
    }
    return output * weight;
}
exports.oneRepMax = oneRepMax;
function nRepMax(n, weight, reps) {
    if (n === 1) {
        return oneRepMax(weight, reps);
    }
    /**
     * Apply each expression for a given formula (e.g. epley) in sequence, either multiplying by or dividing by the
     * current term depending on the inverse of the value of the multiply property. This inverts the expression for
     * when 1RM and reps are known.
     */
    var output = 1;
    for (var _i = 0, epley_2 = epley; _i < epley_2.length; _i++) {
        var instruction = epley_2[_i];
        output *= instruction.multiply ? 1.0 / instruction.expression(n) : instruction.expression(n);
    }
    return output * oneRepMax(weight, reps);
}
exports.nRepMax = nRepMax;
