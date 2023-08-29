

import connectionInfo from "../databaseConfig.js";

let getAllQustions = (req, res) => {
    const { user_id } = req.body;
    let getAllQ = `
        SELECT questions.*, registrations.user_first_name, registrations.user_last_name,
               registrations.user_name, registrations.user_email, registrations.user_role,
               registrations.user_OTP
        FROM questions
        JOIN registrations ON questions.user_id = registrations.user_id
        `;
    
    connectionInfo.query(getAllQ, (err, data) => {
        if (err) {
            console.log(err.message);
            res.status(500).send("An error occurred.");
        } else {
            res.send(data);
        }
    });
};

export default getAllQustions;

