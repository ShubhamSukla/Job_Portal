
//const express=require('express');
import  express  from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';


//files imports
import connectDb from './config/db.js';
import testRoutes from "./routes/testRoutes.js"

dotenv.config()

// mongodb connnection

connectDb();

const app=express()


//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


//routes

app.use("/api/v1/test",testRoutes);


const PORT=process.env.PORT||8080

app.listen(PORT,()=>{
    console.log(`Node server running in ${process.env.DEV_MODE} mode on port no ${PORT}`.bgCyan.white);
});