module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        surname: DataTypes.STRING,
        email: DataTypes.STRING,
        genre: DataTypes.STRING,
        isAdmin: DataTypes.TINYINT,
        created: DataTypes.DATE,
        password: DataTypes.STRING
    }, {
        timestamps: false
    }, {
        tableName: 'user'
    });
    return User;
};