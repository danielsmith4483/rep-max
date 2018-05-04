/**
 * Returns the estimated rep max for a given weight and rep count using the Epley formula.
 * @param weight The weight used in the rep max calculation.
 * @param reps The number of reps used in the rep max calculation.
 * @returns The estimated rep max.
 */
export function repMax(weight: number, reps: number): number {
    if (weight < 0) {
        throw new RangeError("Negative weight ranges are not allowed.");
    }
    if (reps <= 0) {
        throw new RangeError("Nonpositive rep ranges are not allowed.");
    }

    if (reps === 1) {
        return weight;
    }

    return weight * (1 + reps / 30);
}
