const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class User extends Model { }
    User.init({
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

    },
        {
            sequelize,
            modelName: "User"
        })
    return User
}