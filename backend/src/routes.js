const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController'); 
const LoginController = require('./controllers/LoginController');

const routes = Router();

// Session Login
routes.post('/login',LoginController.store);

// Session Register 
routes.get('/users', DevController.index);
routes.post('/users', DevController.store );

// Session search user
routes.get ('/search', SearchController.index);


module.exports = routes;