//API Documentation
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
//const express=require('express');
import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';


//files imports
import connectDb from './config/db.js';

// security
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
//routes import

import testRoutes from "./routes/testRoutes.js";
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'
import jobsRoutes from "./routes/jobsRoute.js" 

dotenv.config();

// mongodb connnection

connectDb();

// Swagger api config
// swagger api options
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Job Portal Application",
            description: "Node Expressjs Job Portal Application",
        },
        servers: [
            {
                //         url: "http://localhost:8080",
                url: "https://nodejs-job-portal-app.onrender.com"
            },
        ],
    },
    apis: ["./routes/*.js"], 
};

const spec = swaggerDoc(options);

const app = express();
//app.set('trust proxy', true);


//middlewares
app.use(helmet({}));
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


//routes

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
//app.use(errorMiddleware);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

//homeroute root
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

//validation middleware
app.use(errorMiddleware);
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Node server running in ${process.env.DEV_MODE} mode on port no ${PORT}`.bgCyan.white);
});