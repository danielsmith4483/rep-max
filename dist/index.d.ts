/** Interface describing the options supplied to oneRepMax and nRepMax. */
export interface IOptions {
    /** The string representation of a given 1RM formula. */
    formula: string;
}
/**
 * Returns the estimated rep max for a given weight and rep count using the Epley formula.
 * @param weight The weight used in the rep max calculation.
 * @param reps The number of reps used in the rep max calculation.
 * @returns The estimated rep max.
 */
export declare function oneRepMax(weight: number, reps: number, options?: IOptions): number;
export declare function nRepMax(n: number, weight: number, reps: number, options?: IOptions): number;
