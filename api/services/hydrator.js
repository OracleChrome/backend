//module that hydrates data provided by meta data appropriatre for client
const bing = require('node-bing-api')({
	accKey: '3db91c615efc499e95a3af94f30fd2b4',
	rootUri: 'https://api.cognitive.microsoft.com/bing/v5.0/'
});
const axios = require('axios');
const MAX = 3;

/*type
	image
	location
		yelp
		foursquare
*/

const hydrator = (results, cb) => {
	//for results
	var articles = [];
	results.forEach((slot, i) => {
		if(i < MAX){
			console.log('counting ', i);
			var {metadata, data} = slot;
			//web data
			axios({
				url: `https://api.cognitive.microsoft.com/bing/v5.0/search?q=${metadata.text}&count=2&offset=0&mkt=en-us&safesearch=Moderate`,
				method: 'get',
				timeout: 150000,
				headers: { 'Ocp-Apim-Subscription-Key': '3db91c615efc499e95a3af94f30fd2b4'},
				auth: {
				    username: '3db91c615efc499e95a3af94f30fd2b4',
				    password: '3db91c615efc499e95a3af94f30fd2b4'
				}
			})
			.then((data, e) => articles.push(data.data.webPages.value))
			.catch(err => console.log('le err', err))
		}
	});

	return results.concat(articles);
};

module.exports = hydrator;