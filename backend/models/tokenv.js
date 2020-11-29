module.exports = (sequelize, DataTypes) => {
    const Tokenv = sequelize.define('Tokenv', {
        token: DataTypes.STRING,
        name: DataTypes.STRING,
        surname: DataTypes.STRING
    }, {
        timestamps: false,
        tableName: 'tokensv'
    });
    return Tokenv;
};