var express 	= require('express'),
	bodyParser 	= require('body-parser'),
	app			= express();

const PORT = 8888;

//controllers
const nlp = require('./api/controllers/text');

app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}));

app.get('/', (req, res) => res.json({message: 'Oracle server is ready to hook you up with meals'}));
app.get('/stores', (req, res) => res.json({data: []}))
app.get('/nlp', nlp.sentiment);

app.listen(PORT, () => console.log(`Oracle is up and running on port ${PORT}`))