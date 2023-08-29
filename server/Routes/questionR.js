
import express from 'express'
import questionC from '../controllers/questions.js'

let questionRouter = express.Router()

questionRouter.post('/questions',questionC)

export default questionRouter