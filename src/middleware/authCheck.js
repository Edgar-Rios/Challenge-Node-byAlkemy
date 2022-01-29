const { checkToken } = require('../myLib/token')

module.exports = (req, res, next) => {
    const token = req.cookies.userToken;
    console.log(req.cookies.userToken)
    if(token == undefined) res.send({error: "permisos requerido"});
    
    const tokenData = checkToken(token);
    if (tokenData._id == undefined)  res.send({error: "permisos requeridos"});

    next();
}