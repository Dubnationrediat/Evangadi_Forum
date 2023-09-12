
import express from 'express'
import {questionsC,singleQuesion,deleteQuestion} from '../controllers/questions.js'

let questionRouter = express.Router()

questionRouter.post('/questions',questionsC)
questionRouter.get('/singleQ/:user_id',singleQuesion)
questionRouter.delete('/deleteQ/:question_id',deleteQuestion)

export default questionRouter