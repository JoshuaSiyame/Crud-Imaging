const { DataTypes, Sequelize } = require('sequelize');

// sequelize instance
// connection to database
const sequelize = new Sequelize({
    dialect: process.env.DIALECT,
    storage: 'database.sqlite'
});

sequelize.authenticate().then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.error("Failed to connect to database: ", error);
});

// user model/schema
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'client'),
        defaultValue: 'client'
    }
});


// image model/schema
const Image = sequelize.define("image", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.BLOB("long"),
        allowNull: false
    },
    mimeType: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// sync models
User.sync();
Image.sync();

module.exports = { Image, User };