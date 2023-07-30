import data from "../data/patients";
import { v1 as uuid } from 'uuid';
import { Patient, newPatient, PatientWithoutSSN } from "../utils/types";


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

export const addPatient = (patientInput: newPatient): Patient => {
        const id = uuid();
        const newPatient: Patient = {
            id,
            ...patientInput
        };
    
    data.push(newPatient);
    return newPatient;
};