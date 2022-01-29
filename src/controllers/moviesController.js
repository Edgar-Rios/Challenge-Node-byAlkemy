const db = require('../database/models');

module.exports = {

    "list": (req, res) => {
        let restricts = {};
        if(req.query.name) restricts['titulo'] = req.query.name;
        if(req.query.genre) restricts['genero_idgenero'] = req.query.genre;

        let order = req.query.order;
        let orderBy;
        
        if(order) 
            orderBy = (order=='asc' || order=='desc')? order : "asc";

        db.Movie.findAll({
            attributes: ['id', 'titulo', 'add_date'],
            where: { ...restricts },
            order: [['id', orderBy]]
        })
        .then(movies => res.send(movies))
        .catch(error => res.send({error}))
    },
    
    "detail": (req, res) => {
        let movieId = req.params.id;
        db.Movie.findByPk(movieId,{
            include: [{ association: 'characters' }]
        })
        .then(movie => {
            if(movie) res.send(movie);
            if(!movie) res.send([]);
        })
        .catch(error => res.send({error}))
    },
    
    "create": (req, res) => {
        db.Movie.create({
            titulo: req.body.titulo,
            imagen: req.body.imagen,
            add_date: req.body.add_dat,
            calificacion: req.body.calificacion,
            genero_idgenero: req.body.genero,
        })
        .then(result => res.send(result))
        .catch(error => res.send({error}));
    },
    
    "update": (req, res) => {
        let id = req.params.id;
        db.Movie.update({
            add_date: req.body.add_date/* new Date(Date.now()) */,
        },{
            where: { id }
        })
        .then(result => res.send({ updated: result? true : false }))
        .catch(error => res.send({ error }))

    },
    
    "delete": (req, res) => {
        let id = req.params.id;
        db.Movie.destroy({
            where: { id }
        })
        .then(result => res.send({ deleted : result? true : false }))
        .catch(error => res.send({error}));
    
    },
    
}