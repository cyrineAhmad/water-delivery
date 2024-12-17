import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from 'cors';
import waterRouter from './routers/water.router.js';
import userRouter from './routers/user.router.js';
import orderRouter from './routers/order.router.js';
import refillRouter from './routers/refillRequests.router.js';
import { dbconnect } from "./Config/database.config.js";
dbconnect();
const app = express();
app.use(express.json());
app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:3000'], 
    })
  );
  

app.use('/api/waters', waterRouter);
app.use('/api/users', userRouter);
app.use('/api/orders',orderRouter);
app.use('/api/refills',refillRouter);
const PORT = 5000;
app.listen(PORT,() => {
    console.log('Listening on port '+ PORT);
});
