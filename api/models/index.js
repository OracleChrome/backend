const Sequelize = require('sequelize');
const sql 		= new Sequelize(
  'postgres',
  'postgres',
  null,
  {
    dialect: 'postgres',
    host: '192.168.99.100',
    port: '5432',
  }
);
//models
const History 	= require('./history');
const User 		= require('./user');
const model_config = { underscored: true, updatedAt: false};

var UserModel = sql.define('user', User, model_config);
var HistoryModel = sql.define('history', History, model_config);

//realtions
UserModel.hasMany(HistoryModel);
HistoryModel.belongsTo(UserModel);

sql.sync({force:true}).then(function () {
});

module.exports =  sql;
