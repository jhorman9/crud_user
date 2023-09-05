import { DataTypes } from "sequelize";
import db from '../utils/database.js';

const User = db.define('users', {
    //Definir todos los atributos / columnas de las tablas

    //id, username, password

    id: {
        //Tipo de dato
        type: DataTypes.INTEGER,
        // Llave primary
        primaryKey: true,
        // Autoincrementable
        autoIncrement: true,
    },

      //Username varchar(30) [not null]
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },

    //email varchar(30)[not null, unique]
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default User;