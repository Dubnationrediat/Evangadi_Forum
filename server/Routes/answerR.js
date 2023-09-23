
import express from 'express'
import {answerC , getAllAnswers,singleAnswer,deleteAnswerC} from '../controllers/answer.js'

let answerRouter = express.Router()

answerRouter.post('/answer',answerC)
answerRouter.get('/allQuestions/:question_id/:user_id',getAllAnswers)
answerRouter.get('/uniqueAns/:question_id/:user_id',singleAnswer)
answerRouter.delete('/deleteAnswer/:answer_id',deleteAnswerC)


export default answerRouter