const APPID 	= '421d9003';
const APPKEY 	= '4044146615866869b5a393e0ebae59ad';
const BINGKEY 	= '83642663acce4d758ac689d5dd56ce70';
const NLP_PATH 	= 'my_script.py'; 

const Aylien 	= require('aylien_textapi');

const DB 		= require('../models'); 
const hydro 	= require('../services/hydrator');

// const shell 	= new python(NLP_PATH);
const bing 		= require('node-bing-api')({accKey: BINGKEY});
const natlan 	= new Aylien({
					application_id: APPID,
					application_key: APPKEY});

module.exports = {
	sentiment(req, res) {
		var {text} = req.body;
		natlan.entities(text, (err, results) => {
			res.json(err || results);
		});
	},

	user(req, res) {
		var {email, googleId} = req.body;

		if(!email || !googleId)
			return res.status(400).send('Paylod missing email or googleId, please try agian.');

		// user query logic
		DB.models.user.findOne({where: {googleid: googleId}})
			.then(user => {
				// var usr = user.get({plain: true});
				// if(!usr.email)
				// 	return res.status(404).send('User not Found');

				return res.send(user);
			})
			.catch(err => {
				console.log(err);
				res.status(500).json(err)
			});
	},

	users(req, res) {
		var {email, googleId, history} = req.body;
		console.log('le body', req.body);

		if(!email || !googleId || history)
			return res.status(400).send('`users` paylod is missing a property, please try again.');

		//do null checking

		

		DB.models.user.findOrCreate({where: {email: email, googleid: googleId}})
		.then(user => console.log(user))
		.then(() => {
			history.map(h => {
			h.user_id = user.id;
			return h;
		});
			return DB.models.history.bulkCreate(history)
			.then(something => res.send('User was successfully added'))
			.catch(err => res.json(err));
		});


		
		// DB.models.user.findOrCreate({where: {email: email, googleid: googleId}})
		// 	.then((user) => {
		// 		hist.user_id = googleId;			
		// 		return DB.models.history.create(hist);
		// 	})
		// 	.then(() => res.send('User was successfully added'))
		// 	.catch(err => res.json(err));
	},

	nlp(req, res) {
		//immediatey remove event listener after everyshell call, to avoid memory leak
		var {googleId, webpage} = req.body; // do null checking

		natlan.entities(webpage, (err, data) => res.json(err || [{
			metadata: {
				type: 'google-maps', 
				term: 'Miami', 
				catergory: 'location'},
			data: 'https://www.google.com/maps?q=maimi'
		},{ 
			metadata: {
				type: 'youtube-video', 
				term: 'Miami', 
				catergory: 'location'},
			data: 'https://www.youtube.com/watch?v=XzGLSrgrT2M'
		},{ 
			metadata: {
				type: 'youtube-video', 
				term: 'Miami', 
				catergory: 'location'},
			data: 'https://www.youtube.com/watch?v=XzGLSrgrT2M'
		}, { 
			metadata: {
				type: 'twitter-tweet', 
				term: 'GraphQL', 
				catergory: 'location'},
			data: {
				author: 'stubailo',
				tweet: 'Slowly expanding my repository of different ways to generate #GraphQL schemas in JavaScript! https://github.com/apollostack/graphql-syntax … add your own!',
				authorImage: 'https://pbs.twimg.com/profile_images/711276909544361984/eL3C4-Ui_bigger.jpg'
			}
		}, { 
			metadata: {
				type: 'wikipedia-information', 
				term: 'Composition over Inheritance', 
				catergory: 'location'},
			data: 'https://en.wikipedia.org/wiki/Composition_over_inheritance'
		},{ 
			metadata: {
				type: 'yelp-information', 
				term: 'Barcade', 
				catergory: 'location'},
			data: {
				name: 'Barcade',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat alias commodi maiores assumenda ad. Rerum eligendi unde obcaecati, eius expedita, tempora itaque accusamus non molestias nihil, amet dolores velit cupiditate.',
				authorImage: 'https://pbs.twimg.com/profile_images/711276909544361984/eL3C4-Ui_bigger.jpg'
			}
		}]));


		// shell.send({googleId, webpageText: webpage});
		// shell.on('message', (msg) => res.json(msg)); // hydrate with more data

		//on error, fallback to aylien and hydrate data
		// for client

	}

}