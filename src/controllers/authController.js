const db = require('../database/models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../myLib/token');
const token = require('../myLib/token');

module.exports = {
    
    "register": (req, res) => {
        const {email, pass} =  req.body;
        // validar mail unico
        db.User.findOne({
            where: {
                email,
            }
        })
        .then(user => {
            // res.send(user);
            
            if(user)  res.send('email invalido');
            
            if(!user){
                db.User.create({
                    email,
                    pass: bcrypt.hashSync(pass, 10),
                })
                .then(result => res.send(result));
            }
            return;
        })
        .catch(error => {
            res.send({error})
        })
        // .catch(error => res.send({error: "fallo perritou"}));
    },

    "login": (req, res) => {
        const {email, pass} = req.body;

        db.User.findOne({
            where:{
                email,
            }
        })
        .then(user => {
            if(bcrypt.compareSync(pass, user.pass)) {
                let token = generateToken(user);
                // console.log(token)
                const TIME = 60000;  //tiempo en milisegundos

                res.cookie("userToken", token, {
                    expires: new Date(Date.now() + TIME),
                    httpOnly: true,
                    // secure: true
                });
                res.send(token);
                return Promise.resolve();
            }
            return Promise.reject();
        })
        .catch(() => res.send({error: "credenciales invalidas"}))
    }
}

/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjMsImlhdCI6MTY0MzQzMTc5NCwiZXhwIjoxNjQzNDM1Mzk0fQ.PpNyPenVWYK7GAatilWGhUknNR2TG5uYZgHam6rwz1s */