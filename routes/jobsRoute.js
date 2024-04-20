import express from "express";
import { createJobController, getAllJobsController, updateJobController, deleteJobController } from "../controllers/jobsController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes
// CREATE JOB || POST
router.post("/create-job", userAuth, createJobController);

//GET JOB
router.get("/get-job", userAuth, getAllJobsController);

//UPDATE JOBS ||  PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

//DELETE JOBS || DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);


export default router;