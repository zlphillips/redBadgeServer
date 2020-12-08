const UserModel = require('./user')
const ProfileModel = require('./profile')
const PostsModel = require('./posts')
const CommentModel = require('./comment')
const MessageModel = require('./message')

UserModel.hasOne(ProfileModel, {
    onDelete: "CASCADE",
    foreignKey: "createdByUser",
});
ProfileModel.belongsTo(UserModel);

UserModel.hasMany(MessageModel, {
    foreignKey: "sentByUser"
})

UserModel.hasMany(PostsModel, {
    onDelete: "CASCADE",
    foreignKey: "createdByUser",
});
PostsModel.belongsTo(UserModel);

UserModel.hasMany(CommentModel, {
    onDelete: "CASCADE",
    foreignKey: "createdByUser",
});
CommentModel.belongsTo(UserModel);

PostsModel.hasMany(CommentModel, {
    foreignKey: "belongsToPost",
});
CommentModel.belongsTo(PostsModel);



// So Model.belongsToMany() acts and looks almost identical to hasMany(), however it has a few key differences. It accepts 2 parameters. The first being the model we want to attach the Join table to 

module.exports = {
    UserModel,
    ProfileModel,
    PostsModel,
    CommentModel,
    MessageModel,
};