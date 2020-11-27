const Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
});

sequelize.authenticate().then(
    function success() {
        console.log('Connected to database');
     },
    function error(err) { 
        console.log(err);
    }
);

let userModel = sequelize.import('./models/user')
let profileModel = sequelize.import('./models/profile')
let postsModel = sequelize.import('./models/posts')
let commentModel = sequelize.import('./models/comment')

userModel.hasOne(profileModel);
profileModel.belongsTo(userModel);
userModel.hasMany(postsModel);
postsModel.belongsTo(userModel);
userModel.hasMany(commentModel);
commentModel.belongsTo(userModel);
postsModel.hasMany(commentModel);
commentModel.belongsTo(postsModel);





module.exports = sequelize;