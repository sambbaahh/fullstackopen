import data from "../data/diagnoses";
import { Diagnose } from "../utils/types";

export const getDiagnoses = (): Diagnose[] => {
    return data;
};