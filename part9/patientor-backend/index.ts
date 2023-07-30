import express from 'express';
import cors from "cors";
import { getDiagnoses } from './services/diagnoses';
import { getPatients } from './services/patients';

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors()); //cors added because there was an error "CORS missing allow origin"

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});


app.get('/api/diagnoses', (_req, res) => {
  res.send(getDiagnoses());
});

app.get('/api/patients', (_req, res) => {
  res.send(getPatients());
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});