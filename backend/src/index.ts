import e from 'express';
import { env } from './config/env';
import cors from "cors";
import {getCorsOptions} from './config/cors';
import routesApp from './routes/index';

const port = env.PORT;

const app = e();
app.use(cors(getCorsOptions()));

app.use(routesApp);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});