module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        parentId: DataTypes.STRING,
        timestamp: DataTypes.DATE,
        body: DataTypes.STRING,
        author: DataTypes.STRING,
        voteScore: DataTypes.INTEGER,
        deleted: DataTypes.TINYINT,
        parentDeleted: DataTypes.TINYINT
    }, {
        timestamps: false
    }, {
        tableName: 'comment'
    });
    return Comment;
};