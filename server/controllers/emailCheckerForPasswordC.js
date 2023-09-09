import connectionInfo from "../databaseConfig.js"
import nodemailer from 'nodemailer'
import JWT from 'jsonwebtoken'

let emailChecker = (req,res)=>{
      const {emailFromFront} = req.body
      let emailSelector = `SELECT user_id,user_email from registrations WHERE user_email ='${emailFromFront}'`
      let forOTP = `UPDATE registrations SET user_OTP = (?)  WHERE user_email='${emailFromFront}'`;
      connectionInfo.query(emailSelector,(err,data,field)=>{
          if(err){
            console.log(err.message)
          }else{
            if(data){
                let emailFinder = data.find((email)=>email.user_email===emailFromFront)
                if(emailFinder === undefined){
                    res.json({
                        message: "Email doesn't Exist",
                        redirect: "/signup",
                        confirmation: false,
                        redirectMessage: "Click Here To Signup",
                    })
                }else {
                    function sendEmail() {
                      let mailSender = nodemailer.createTransport({
                        service: "gmail",
                        port: 465,
                        auth: {
                          user: "red.terefe@gmail.com",
                          pass: "cvuvlniuqsjgmdbc",
                        },
                      });
                      // function generateOTP() {
                      //   let digits = "0123456789";
                      //   let OTP = "";
                      //   for (let i = 0; i < 4; i++) {
                      //     OTP += digits[Math.floor(Math.random() * 10)];
                      //   }
                      //   connectionInfo.query(forOTP, [OTP], (err, result, fields) => {
                      //     if (err) {
                      //       console.log(err.message);
                      //     } else {
                      //       console.log("OTP sent to DB");
                      //     }
                      //   });
                      //   return OTP;
                      // }
                      // let OTP = generateOTP();
                     
                      let details = {
                        from: "red.terefe@gmail.com",
                        to: emailFromFront,
                        subject: "Your OTP for Changing Password",
                        // text: `Please Dont share this number, Your OTP for Password Change is : ${OTP}`,
                        text: `http://localhost:3000/user/updatePassword/${data[0].user_id}`,
                      };
                      mailSender.sendMail(details, (err) => {
                        if (err) {
                          console.log(err.message);
                        } else {
                          console.log("email sent");
                        }
                      });
                    }
                    sendEmail();
                    let emailEncrypted = JWT.sign(
                        emailFromFront,
                      "IITPasswordEncrypted"
                    );
                    res.send({
                      forThanking: `Please Check Your Email for Update Link!`,
                      Status: true,
                      Encrypt: emailEncrypted,
                      // email:user_email_for_Password,
                      forHomePageReturn: `Click Here To Go Back To logIn Page`,
                      route :'/login'
                    });
                  }
            }
          }
      })
}


export default emailChecker















