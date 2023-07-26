import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const weight: number = Number(req.query.weight);
        const height: number = Number(req.query.height);
        const bmi: string = calculateBmi(height, weight);
        const result = {
            weight: weight,
            height: height,
            bmi: bmi
        }
        res.send(result);
    } catch (e) {
        res.status(400).send({
            error: "malformatted parameters"
        })
    }
});



const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

