import login from "../controllers/login.js";
import express from 'express'

let loginRouter = express.Router()
loginRouter.post('/login',login)

export default loginRouter