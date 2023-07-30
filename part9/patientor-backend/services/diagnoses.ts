import data from "../data/diagnoses";

export type Diagnose = {
    code: string;
    name: string;
    latin?: string;
};

export const getDiagnoses = (): Diagnose[] => {
    return data;
};