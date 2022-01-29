module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie';
    let cols = {
        "id": {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },

        "titulo": {
            type: dataTypes.STRING(75),
            allowNull: false,
        },

        "imagen":{
            type: dataTypes.STRING(100),
        },

        "add_date":{
            type: dataTypes.DATE,
        },

        "calificacion":{
            type: dataTypes.INTEGER.UNSIGNED,
        },
        "genero_idgenero":{
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    }
    let config = {
        tableName: 'film',
        timestamps: false,
    };

    let Movie = sequelize.define(alias, cols, config);

    Movie.associate = models => {
        
        Movie.belongsTo(models.Genre, {
            as: 'genre',
            foreignKey: 'genero_idgenero',
        })

        Movie.belongsToMany(models.Character, {
            as: 'characters',
            through: 'personaje_has_film',
            foreignKey: 'film_idfilm',
            otherKey: 'personaje_idpersonaje',
        })
    }

    return Movie;
}