import express from 'express';
import { env } from './config/env';
import cors from "cors";
import {getCorsOptions} from './config/cors';

const port = env.PORT;

const app = express();
app.use(cors(getCorsOptions()));

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});