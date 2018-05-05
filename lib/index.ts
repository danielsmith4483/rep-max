/** Interface representing the instructions for a formula item. */
interface IFormulaItem {
    /** The function to evaluate for the current formula item. */
    expression: (r: number) => number;
    /** A boolean indicating whether a 1RM calculator should multiply by the expression. */
    multiply: boolean;
}

/** Interface representing the object of objects containing the various formulae. */
interface IFormulae {
    /** An array of IFormulaItems, indexed by a string. */
    [key: string]: IFormulaItem[];
}

/** Interface describing the options supplied to oneRepMax and nRepMax. */
export interface IOptions {
    /** The string representation of a given 1RM formula. */
    formula: string;
}

const formulae: IFormulae = {
    brzycki: [
        {
            expression: (r: number) => {
                return 36 / (37 - r);
            },
            multiply: true,
        },
    ],
    epley: [
        {
            expression: (r: number) => {
                return 1 + r / 30;
            },
            multiply: true,
        },
    ],
    lombardi: [
        {
            expression: (r: number) => {
                return Math.pow(r, 0.10);
            },
            multiply: true,
        },
    ],
    mayhew: [
        {
            expression: (r: number) => {
                return 100;
            },
            multiply: true,
        },
        {
            expression: (r: number) => {
                return 52.2 + 41.9 * Math.exp(-0.055 * r);
            },
            multiply: false,
        },
    ],
    mcGlothin: [
        {
            expression: (r: number) => {
                return 100;
            },
            multiply: true,
        },
        {
            expression: (r: number) => {
                return 101.3 - 2.67123 * r;
            },
            multiply: false,
        },
    ],
    oConner: [
        {
            expression: (r: number) => {
                return 1 + r / 40;
            },
            multiply: true,
        },
    ],
    wathan: [
        {
            expression: (r: number) => {
                return 100;
            },
            multiply: true,
        },
        {
            expression: (r: number) => {
                return 48.8 + 53.8 * Math.exp(-0.075 * r);
            },
            multiply: false,
        },
    ],
};

/**
 * Returns the estimated rep max for a given weight and rep count using the Epley formula.
 * @param weight The weight used in the rep max calculation.
 * @param reps The number of reps used in the rep max calculation.
 * @returns The estimated rep max.
 */
export function oneRepMax(weight: number, reps: number, options?: IOptions): number {
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
    let output = 1;
    for (const instruction of formulae[options.formula]) {
        output *= instruction.multiply ? instruction.expression(reps) : 1.0 / instruction.expression(reps);
    }
    return output * weight;
}

export function nRepMax(n: number, weight: number, reps: number, options?: IOptions): number {
    if (n === 1) {
        return oneRepMax(weight, reps, options);
    }

    options = options || { formula: "epley" };

    /**
     * Apply each expression for a given formula (e.g. epley) in sequence, either multiplying by or dividing by the
     * current term depending on the inverse of the value of the multiply property. This inverts the expression for
     * when 1RM and reps are known.
     */
    let output = 1;
    for (const instruction of formulae[options.formula]) {
        output *= instruction.multiply ? 1.0 / instruction.expression(n) : instruction.expression(n);
    }
    return output * oneRepMax(weight, reps, options);
}
