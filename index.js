var express 	= require('express'),
	bodyParser 	= require('body-parser'),
	app			= express();

const PORT = 8000;

//controllers
const nlp = require('./api/controllers/nlp');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}));

app.get('/', (req, res) => res.json({message: 'Oracle server is ready to hook you up with meals'}));
app.post('/user', nlp.user);
app.post('/users', nlp.users);
app.post('/nlp', nlp.nlp);
app.get('/web', nlp.web);

app.listen(PORT, () => console.log(`Oracle is up and running on port ${PORT}`))