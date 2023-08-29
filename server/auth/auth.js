import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// auth middleware
const auth = (req, res, next) => {
    try {
        const token = req.header("token");
        if (!token) {
            return res
                .status(401)
                .json({ message: "no authentication token, authorization denied" });
        }else{
            const verified = jwt.verify(token, process.env.JWT_SECRET);
        //   console.log(verified)
            if (!verified) {
                return res
                    .status(401)
                    .json({ message: "token verification failed, authorization denied" });
            }
            
            req.id = verified.id;
            req.display_name= verified.display_name
            next();
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }

};

export default auth;