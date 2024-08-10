const jwt = require("jsonwebtoken")

// user Roleentication middleware
const userRole = async (req, res, next) => {
    try {
        // get token from req.cookie
        const { token } = req.cookies;

        // validate token presence also tunge check expire date hapa ila cja iweka for simplicity
        if (token) {
            // preview token
            console.log("Token: ", token); // check terminal for the token

            // validate role in token
            const validToken = jwt.decode(token, )
        }else{
            return res.status(401).send("UnRoleorized, no token");
        }

        next(); // push to next middleware
    } catch (error) {
        console.error("Failed to validate user: ", error);
        return res.status(401).send("UnRoleorized");
    }
};


module.exports = userRole;