const Sequelize = require('sequelize');
const sql 		= new Sequelize('oracle', 'ashleyn', '', {
	host: 'localhost',
	dialect: 'postgres'
});

//models
const History 	= require('./history');
const User 		= require('./user');
const model_config = { underscored: true, updatedAt: false};

var UserModel = sql.define('user', User, model_config);
var HistoryModel = sql.define('history', History, model_config);

//realtions
UserModel.hasMany(HistoryModel);
HistoryModel.belongsTo(UserModel);

module.exports =  sql;
