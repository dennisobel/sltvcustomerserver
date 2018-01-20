var AuthenticationController = require('./controllers/authentication'), 
    CartController = require('./controllers/cartcontroller')
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');
    var async = require("async")
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
module.exports = function(app){
 
    var apiRoutes = express.Router(),
        authRoutes = express.Router();
        cartRoutes = express.Router();
        //todoRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
 
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });

    //cart routes
    cartRoutes.post("/createcart", CartController.createcart);
    cartRoutes.get("/getcart", CartController.getcart);
    
    app.use('/api', apiRoutes);
    app.use('/cart', cartRoutes); 
}