module.exports = (sequelize, dataTypes) => {

    let alias = 'Genre';

    let cols = {
        "id": {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },

        "nombre": {
            type: dataTypes.STRING(45),
            allowNull: false,
        },

        "imagen":{
            type: dataTypes.STRING(100),
        },
    }

    let config = {
        tableName: 'genero',
        timestamps: false,
    }

    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = models => {
        Genre.hasMany(models.Movie, {
            as: 'movies',
            foreignKey: 'genero_idgenero',
        })
    }

    return Genre;
}