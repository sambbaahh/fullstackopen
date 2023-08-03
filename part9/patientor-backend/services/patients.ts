import data from "../data/patients";
import { v1 as uuid } from 'uuid';
import { Patient, NewPatient } from "../utils/types";


export const getPatients = (): Patient[] => {
    return data.map(({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        ssn,
        entries
    }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        ssn,
        entries
    }
    ));
};

export const getPatientById = (id: string): Patient | undefined => {
    return data.find((patient) => patient.id === id);
};


export const addPatient = (patientInput: NewPatient): Patient => {
        const id = uuid();
        const NewPatient: Patient = {
            id,
            ...patientInput,
        };
    
    //data.push(NewPatient);
    return NewPatient;
};