/** Interface describing the options supplied to oneRepMax and nRepMax. */
export interface IOptions {
    /** The string representation of a given 1RM formula. */
    formula: string;
}
/**
 * Returns the estimated One-Rep Max for a given weight and rep count using the Epley formula.
 * @param weight The weight used in the rep max calculation.
 * @param reps The number of reps used in the rep max calculation.
 * @param options Optional parameter conforming to IOptions for supplying additional customization.
 * @returns The estimated One-Rep Max.
 */
export declare function oneRepMax(weight: number, reps: number, options?: IOptions): number;
/**
 * Returns the estimated N-Rep Max for a given n, weight, and rep count using the Epley formula.
 * @param n The number of reps for which the N-Rep Max calculation is intended.
 * @param weight The weight used in the rep max calculation.
 * @param reps The number of reps used in the rep max calculation.
 * @param options Optional parameter conforming to IOptions for supplying additional customization.
 * @returns The estimated N-Rep Max.
 */
export declare function nRepMax(n: number, weight: number, reps: number, options?: IOptions): number;
