const jwt = require("jsonwebtoken")

// user authentication middleware
const userAuth = async (req, res, next) => {
    try {
        // get token from req.cookie
        const { token } = req.cookies;

        // validate token presence also tunge check expire date hapa ila cja iweka for simplicity
        if (token) {
            // preview token
            console.log("Token: ", token); // check terminal for the token

            // validate token
            const validToken = jwt.verify(token, 'your secret hash goes here');

            if(validToken){
                next(); // push to next middleware
            }
        }else{
            return res.status(401).send("Unauthorized, no token");
        }

    } catch (error) {
        console.error("Failed to validate user: ", error);
        return res.status(401).send("Unauthorized");
    }
};


module.exports = userAuth;