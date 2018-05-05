/**
 * The Epley formula, defined as 1RM = w(1 + r/30).
 */
const epley = [
    {
        expression: (r: number) => {
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
export function oneRepMax(weight: number, reps: number): number {
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
    let output = 1;
    for (const instruction of epley) {
        output *= instruction.multiply ? instruction.expression(reps) : 1.0 / instruction.expression(reps);
    }
    return output * weight;
}

export function nRepMax(n: number, weight: number, reps: number): number {
    if (n === 1) {
        return oneRepMax(weight, reps);
    }

    /**
     * Apply each expression for a given formula (e.g. epley) in sequence, either multiplying by or dividing by the
     * current term depending on the inverse of the value of the multiply property. This inverts the expression for
     * when 1RM and reps are known.
     */
    let output = 1;
    for (const instruction of epley) {
        output *= instruction.multiply ? 1.0 / instruction.expression(n) : instruction.expression(n);
    }
    return output * oneRepMax(weight, reps);
}
