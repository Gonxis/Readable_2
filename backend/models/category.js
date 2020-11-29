module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: DataTypes.STRING,
        URL_Path: DataTypes.STRING,
        created: DataTypes.DATE,
    }, {
        timestamps: false
    }, {
        tableName: 'category'
    });
    return Category;
};