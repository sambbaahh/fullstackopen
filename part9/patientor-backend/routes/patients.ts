import express from 'express';
import { getPatients, addPatient } from '../services/patients';
import { parseNewPatient } from '../utils/NewPatient';


const router = express.Router();

router.get('/', (_req, res) => {
    res.send(getPatients());
});

router.post('/', (req, res) => {
    try {
        const patient = parseNewPatient(req.body);
        const result = addPatient(patient);
        res.send(result);
    } catch (error: unknown) {
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Unknown error.',
        });
    }
});

export default router;