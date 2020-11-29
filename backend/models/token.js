module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define('Token', {
        token: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        created: DataTypes.DATE,
    }, {
        timestamps: false
    }, {
        tableName: 'token'
    });
    return Token;
};