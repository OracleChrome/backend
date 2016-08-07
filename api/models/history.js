const Sequelize = require('sequelize');
const sql = require('./index');
const {TEXT, DATE, DOUBLE, INTEGER} = Sequelize;

const History = {
	url: TEXT,
	title: TEXT,
	googleid: TEXT,
	last_visit_time: DOUBLE,
	visit_count: INTEGER,
	typed_count: INTEGER
};

module.exports = History;
