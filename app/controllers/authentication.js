var jwt = require('jsonwebtoken'); 
var User = require('../models/user');
var authConfig = require('../../config/auth');
 
function generateToken(user){
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080
    });
}
 
function setUserInfo(request){
    return {
        _id: request._id,
        phone_number: request.phone_number
    };
}
 
exports.login = function(req, res, next){
 
    var userInfo = setUserInfo(req.user);
 
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
 
}
 
exports.register = function(req, res, next){
 
    var phone_number = req.body.phone_number;
    var password = req.body.password;
 
    if(!phone_number){
        return res.status(422).send({error: 'You must enter an phone_number'});
    }
 
    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }
 
    User.findOne({phone_number: phone_number}, function(err, existingUser){
 
        if(err){
            return next(err);
        }
 
        if(existingUser){
            return res.status(422).send({error: 'That phone_number is already in use'});
        }
 
        var user = new User({
            phone_number: phone_number,
            password: password
        });
 
        user.save(function(err, user){
 
            if(err){
                return next(err);
            }
 
            var userInfo = setUserInfo(user);
 
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })
 
        });
 
    });
 
}
 
/*
exports.roleAuthorization = function(roles){
 
    return function(req, res, next){
 
        var user = req.user;
 
        User.findById(user._id, function(err, foundUser){
 
            if(err){
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }
 
            if(roles.indexOf(foundUser.role) > -1){
                return next();
            }
 
            res.status(401).json({error: 'You are not authorized to view this content'});
            return next('Unauthorized');
 
        });
 
    }
 
}
*/