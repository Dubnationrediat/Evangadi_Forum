// *main imports
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectionInfo from './databaseConfig.js'
dotenv.config()
// * route imports
import createTable from './Routes/createTableR.js'
import getAllUsersRoute from './Routes/getAllUsersR.js'
import getUserByEmailRoute from './Routes/getUserByEmailR.js'
import getUserProfileRoute from './Routes/getUserProfileR.js'
import registerRoute from './Routes/registerR.js'
import loginRouter from './Routes/loginR.js'
import questionRouter from './Routes/questionR.js'
import answerRouter from './Routes/answerR.js'
import getAllQRoute from './Routes/getAllQR.js'
import updateProfile from './Routes/updateProfileR.js'
// *middlewares
const app = express()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization,token');
    next();
  });
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
    origin : 'http://localhost:3000',
    credentials:true
}))


// * main routes 
app.use('/admin',createTable)
app.use('/admin',getAllUsersRoute)
app.use('/admin',getUserByEmailRoute)
app.use('/admin',getUserProfileRoute)
app.use('/user',registerRoute)
app.use('/user',loginRouter)
app.use('/user',questionRouter)
app.use('/user',answerRouter)
app.use('/user',getAllQRoute)
app.use('/user',updateProfile)


// *connection  and server listening
async function connectionHierarchy(){
    try {
        // *connection with database 
        connectionInfo.connect((err)=>{
            if(err){
                console.log(err)
            }else{
                console.log('connection with database created successfully')
                app.listen(process.env.PORT,()=>{
                    console.log(`app is listening to ${process.env.PORT}`)
                })
            }
        })
    } catch (err) {
        console.log(err.message)
    }
}
// * initializing function 
connectionHierarchy()


