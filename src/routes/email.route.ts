import express, { Router } from 'express';
import { emailJob } from '../controller/Emailqueue.controller.js';

const router =  express.Router();

router.get('/add-email-job',emailJob);


export default router;