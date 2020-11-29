module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        timestamp: DataTypes.DATE,
        title: DataTypes.STRING,
        body: DataTypes.STRING,
        author: DataTypes.STRING,
        category: DataTypes.STRING,
        voteScore: DataTypes.INTEGER,
        created: DataTypes.DATE
    }, {
        timestamps: false
    }, {
        tableName: 'post'
    });
    return Post;
};