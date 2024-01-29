const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection'); 
   // nobre para el modelo      // nombre para la base de datos
const User = sequelize.define('user', {
    // Definimos las columnas aquí
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.STRING,
        allowNull: true
    }

});

module.exports = User;