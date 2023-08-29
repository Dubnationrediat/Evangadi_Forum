import tableCreator from '../controllers/tableCreatingC.js'
import express from 'express'

let tableRoute = express.Router()

tableRoute.get('/createTable',tableCreator)

export default tableRoute