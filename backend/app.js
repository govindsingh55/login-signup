const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

// setting up body-parser
app.use(bodyParser.json());

// support for parsing of applicationCache/x-www-form-urlencoded post data
app.use(
	bodyParser.urlencoded({
		extended: true,
		limit: '4MB'
	})
);

// handeling CORS error
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

// routes
app.use('/', routes);

// setting up database (mongoDB with mongoose)
mongoose
	.connect('mongodb://localhost:27017/login_signup_test', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('info', 'connected to Mongodb'))
	.catch((err) => console.log('info', `databse error: ${err}`));

//setting up error handling if no routes full fill request
app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

// handling errors
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
