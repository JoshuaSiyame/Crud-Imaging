const { DataTypes, Sequelize } = require('sequelize');

// sequelize instance
// connection to database
const sequelize = new Sequelize({
    dialect: process.env.DIALECT,
    storage: 'images.sqlite'
});

sequelize.authenticate().then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.error("Failed to connect to database: ", error);
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

// sync model
Image.sync()

module.exports = Image;