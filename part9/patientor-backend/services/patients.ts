import data from "../data/patients";
import { v1 as uuid } from 'uuid';
import { Patient, NewPatient, PatientWithoutSSN } from "../utils/types";


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

export const addPatient = (patientInput: NewPatient): Patient => {
        const id = uuid();
        const NewPatient: Patient = {
            id,
            ...patientInput
        };
    
    data.push(NewPatient);
    return NewPatient;
};