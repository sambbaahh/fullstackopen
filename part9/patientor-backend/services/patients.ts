import data from "../data/patients";

type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
};

type PatientWithoutSSN = Omit<Patient, 'ssn'>;


export const getPatients = (): PatientWithoutSSN[] => {
    return data.map(({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }) => ({

        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }
    ));
};