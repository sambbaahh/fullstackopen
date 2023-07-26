import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculator, Operation } from './calculator';
import { calculateExercises } from './exerciseCalculator';
import { isNotNumber } from './utils';

const app = express();
app.use(express.json());

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
        };
        res.send(result);
    } catch (e) {
        res.status(400).send({
            error: "malformatted parameters"
        });
    }
});

app.post('/calculate', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value1, value2, op } = req.body;
    if (!value1 || isNaN(Number(value1))) {
        return res.status(400).send({ error: '...' });
    }
    if (!value2 || isNaN(Number(value2))) {
        return res.status(400).send({ error: '...' });
    }
    if (!['multiply', 'add', 'divide'].includes(String(op))) {
        return res.status(400).send({ error: '...' });
    }
    const result = calculator(Number(value1), Number(value2), op as Operation);
    return res.send({ result });
});

app.post('/exercises', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { daily_exercises, target } = req.body;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        isNotNumber(daily_exercises, target);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result = calculateExercises(daily_exercises, target);
        
        return res.send({ result });
    } catch (error) {
        return res.status(400).send({
            error: "malformatted parameters"
        });
    }
});


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

