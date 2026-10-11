import express from 'express';
import { calculateBmi, calculateRange } from './bmiCalculator.ts';
import calculateExercises from './exerciseCalculator.ts';
const app = express();
app.use(express.json());
app.get('/hello', (_req: express.Request, res: express.Response) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi', (req: express.Request, res: express.Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  
  try {
    const resultado = calculateBmi(height, weight);
    if (resultado instanceof Error) {
      throw resultado;
    }

    const bmi = resultado; // ahora TypeScript lo sabe como number
    const range = calculateRange(bmi);
    res.json(
      {
        weight: weight,
        height: height,
        bmi: range,
      });
  }catch (_error) {
    res.status(400).json({ 'error': 'malformatted parameters' });
  }
  
  ;
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const daily:any = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const target:any = req.body.target;
  if (!daily || !target) {
    return res.status(400).json({'error':'parameters missing'});
  }
  else if (Array.isArray(daily) && daily.some(p=>isNaN(Number(p))) || isNaN(Number(target))) {
      return res.status(400).json({ 'error':'malformatted parameters' });
  } 
  else if (!daily.some(p=> isNaN(Number(p))) && !isNaN(Number(target))) {
    const result = calculateExercises(daily.map(Number),Number(target));
    return res.json(result);
  }
  else {
      return res.status(400).json({'error':'an error has occurred'});
    }
  
}); 
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});