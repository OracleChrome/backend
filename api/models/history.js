const Sequelize = require('sequelize');
const sql = require('./index');
const {STRING, DATE, DOUBLE, INTEGER} = Sequelize;

const History = {
	url: STRING,
	user_id: STRING,
	title: STRING,
	googleid: STRING,
	last_visit_time: DOUBLE,
	visit_count: INTEGER,
	typed_count: INTEGER
};

module.exports = History;