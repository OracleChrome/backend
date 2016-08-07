//module that hydrates data provided by meta data appropriatre for client
const bing = require('node-bing-api')({accKey: '83642663acce4d758ac689d5dd56ce70'});

/*type
	image
	location
		yelp
		foursquare
*/

const hydrator = ({metadata, data}, cb) => {
	bing.relatedSearch(metada.text || 'graphql', {market: 'en-US'}, function (err, res, body) {
	  var suggestions = body.d.results.map(function(r){ return r.Title; });
	  console.log(suggestions.join('\n'));
	});
};

module.exports = {
	realted: bing.relatedSearch
};