
//const express=require('express');
import  express  from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDb from './config/db.js';


dotenv.config()

// mongodb connnection

connectDb();

const app=express()


app.get("/",(req,res)=>{
    res.send("<h1>Welcome to job portal</h1>")
})

const PORT=process.env.PORT||8080

app.listen(PORT,()=>{
    console.log(`Node server running in ${process.env.DEV_MODE} mode on port no ${PORT}`.bgCyan.white);
});