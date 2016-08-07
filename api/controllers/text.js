const Aylien 	= require('aylien_textapi');
const hydro 	= require('../services/hydrator');
const bing = require('node-bing-api')({accKey: '83642663acce4d758ac689d5dd56ce70'});

const nlp = new Aylien({
  application_id: '421d9003',
  application_key: '4044146615866869b5a393e0ebae59ad'});

module.exports = {
	sentiment(req, res){
		var { text } = req.body;

		// nlp.entities(text, (err, results) => {
		// 	if (err) { return res.json(err) }


		// 	res.json(results);
		// });

		bing.images('Bernie Sanders', {market: 'en-us'}, (err, data) => {
			console.log('search: ', err, data);
			res.send(err || data)
		});
	}

}