const db = require('../database/models');
const sequelize = db.sequelize;


module.exports = {
    "list": (req, res) => {
        let restricts = {};
        if(req.query.name) restricts['nombre'] = req.query.name;
        if(req.query.age) restricts['edad'] = req.query.age;
        if(req.query.movies) restricts['id'] = req.query.movies;
        
        db.Character.findAll( {
            attributes: ['id', 'nombre', 'imagen'],
            where: { ...restricts },
        })
        .then(characters => {
            res.send(characters);
        })
        .catch(error => res.send(error))
    },
    "detail": (req, res) => {
        let id = +req.params.id;
        db.Character.findByPk(id, {
            include: [{ association: 'movies' }]
        })
            .then(character => {
                if(character) 
                    res.send(character)
                else
                    res.send([])
            })
            .catch(error => res.send({error}))
    },
    "create": (req, res) => {
        db.Character.create({
            nombre: req.body.nombre,
            imagen: req.body.imagen,
            historia: req.body.historia,
            edad: req.body.edad,
        })
        .then(result => res.send(result))
        .catch(error => res.send(error));
    },
    "update": (req, res) => {
        let id = req.params.id;
        db.Character.update({
            ...req.body
        }, {
            where: { id }
        })
        .then(result => res.send({actualizado: result? true : false}))
        .catch(error => res.send({error}));
    },
    "delete": (req, res) => {
        let id = req.params.id;
        db.Character.destroy({
            where: { id }
        })
        .then(result => res.send(`elemento borrado? ${result? true : false}`))
        .catch(error => res.send(error));
    },
}