import { answers, profiles, questions, registration } from "../Schema/tables.js";
import connectionInfo from "../databaseConfig.js";

let tableCreator = (req,res)=>{
    connectionInfo.query(registration, (err, results) => {
        if(err){
            console.log(err.message)
        }else{
            connectionInfo.query(profiles, (err, results) => {
                if(err){
                    console.log(err.message)
                }else{
                    connectionInfo.query(questions, (err, results) => {
                        if(err){
                            console.log(err.message)
                        }else{
                            connectionInfo.query(answers, (err, results) => {
                                if(err){
                                    console.log(err.message)
                                }else{
                                    res.send('all tables created successfully')
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}
export default tableCreator