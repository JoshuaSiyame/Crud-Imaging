const jwt = require("jsonwebtoken")

// user Role authorization middleware
const userRole = async (req, res, next) => {
    try {
        // get token from req.cookie
        const { token } = req.cookies;

        // validate token presence also tunge check expire date hapa ila cja iweka for simplicity
        if (token) {
            // preview token
            console.log("Token: ", token); // check terminal for the token

            // validate token
            const validToken = jwt.verify(token, 'your secret hash goes here');

            if(validToken.role == 'admin'){
                next(); // push to next middleware
            }
        }else{
            return res.status(401).send("Unauthorized, not admin");
        }

    } catch (error) {
        console.error("Failed to validate user: ", error);
        return res.status(401).send("Unauthorized");
    }
};


module.exports = userRole;