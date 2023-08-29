import express from 'express';
import getAllQustions from '../controllers/getAllquesiton.js';

let getAllQRoute = express.Router();

getAllQRoute.get('/getAllQuestions',getAllQustions)

export default getAllQRoute