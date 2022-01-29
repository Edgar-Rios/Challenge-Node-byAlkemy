module.exports = (sequelize, dataTypes) => {

    let alias = 'Character';

    let cols = {
        "id": {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },

        "nombre": {
            type: dataTypes.STRING(100),
            allowNull: false,
        },

        "imagen":{
            type: dataTypes.STRING(100),
        },

        "edad":{
            type: dataTypes.INTEGER.UNSIGNED,
        },

        "historia":{
            type: dataTypes.TEXT,
        },
    }

    let config = {
        tableName: 'personaje',
        timestamps: false,
    }

    const Character = sequelize.define(alias, cols, config);

    Character.associate = models => {

        Character.belongsToMany(models.Movie, {
            as: 'movies',
            through: 'personaje_has_film',
            foreignKey: 'personaje_idpersonaje',
            otherKey: 'film_idfilm',
        })
    }

    return Character;
}