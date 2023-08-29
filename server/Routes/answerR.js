
import express from 'express'
import {answerC , getUniqueAnsers} from '../controllers/answer.js'

let answerRouter = express.Router()

answerRouter.post('/answer',answerC)
answerRouter.get('/uniqueAns/:question_id/:user_id',getUniqueAnsers)


export default answerRouter