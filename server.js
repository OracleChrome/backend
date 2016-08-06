var express 	= require('express'),
	bodyParser 	= require('body-parser'),
	app			= express();

const PORT = 8888;

//controllers
var places = require('./api/controllers/places');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => res.json({message: 'Grubn server is ready to hook you up with meals'}));
app.get('/stores', (req, res) => res.json({data: []}))

app.listen(PORT, () => console.log(`Grubn is up and running on port ${PORT}`))