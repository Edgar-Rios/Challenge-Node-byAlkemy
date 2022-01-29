const jwt = require("jsonwebtoken");


const SECRET_KEY = "youD0ntSeeMe";


module.exports = {
    
    "generateToken": user => {
        return jwt.sign(
            { _id: user.id },
            SECRET_KEY,
            { expiresIn: '1h'});
    },

    "checkToken": token => {
        let decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    },

}