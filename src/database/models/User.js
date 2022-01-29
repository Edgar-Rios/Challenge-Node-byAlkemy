module.exports = (sequelize, dataTypes) => {

    const alias = "User";

    const cols = {
        
        "id": {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },

        "email": {
            type: dataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },

        "pass": {
            type: dataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
    }

    const config = {
        tableName: "usuario",
        timestamps: false,
    }

    const User = sequelize.define(alias, cols, config);

    return User;
}