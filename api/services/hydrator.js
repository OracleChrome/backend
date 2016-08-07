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
const config = (query) => {
	return {
		url: `https://api.cognitive.microsoft.com/bing/v5.0/search?q=${query}&count=2&offset=0&mkt=en-us&safesearch=Moderate`,
		method: 'get',
		timeout: 150000,
		headers: { 'Ocp-Apim-Subscription-Key': '3db91c615efc499e95a3af94f30fd2b4'},
		auth: {
		    username: '3db91c615efc499e95a3af94f30fd2b4',
		    password: '3db91c615efc499e95a3af94f30fd2b4'
		}
	};
};

const hydrator = (results, cb) => {
	var terms = results
				.filter((slot, i) => i < MAX)
				.map(slot => slot.metadata.term)
				.map(term => axios(config(term)));

		// console.log('=======>', metadata);
		
	return axios.all(terms)
		.then(axios.spread((a, b, c) => [a, b, c].map(data => data.data.webPages.value)))
		// .then((data, e) => articles.push(data.data.webPages.value))
		// .then(d => {
		// 	console.log('le whoo', d);
		// 	return d;
		// });
};

module.exports = hydrator;