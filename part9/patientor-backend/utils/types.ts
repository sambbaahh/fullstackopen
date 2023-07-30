export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
};

export type PatientWithoutSSN = Omit<Patient, 'ssn'>;
export type newPatient = Omit<Patient, 'id'>;



export type Diagnose = {
    code: string;
    name: string;
    latin?: string;
};