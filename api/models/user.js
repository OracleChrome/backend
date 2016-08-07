const Sequelize = require('sequelize');
const {STRING, DATE, INTEGER} = Sequelize;

const User = {
		id: {type: INTEGER, autoIncrement: true, primaryKey: true},
		email: {type: STRING, allowNull: false, unique: true},
		googleid: {type: STRING, allowNull: true, unique: true}
	};

module.exports = User;