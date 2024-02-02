import express from 'express';
import "dotenv/config";
import cookieParser from "cookie-parser";
import Router from './routes/route';
import { globalErrorHandler } from './utils';

const app = express();


app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/translate", Router);


app.use(globalErrorHandler);
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
})