//var User = require('../models/user');
var Cart = require('../models/cart');
//var myParser = require("body-parser");
var mongoose = require("mongoose")

//mongoose.Promise = global.Promise;

//const cartcontroller = {}

exports.getcart = function(req,res){  
	console.log(res.body)
	Cart
	.find({})
	.then((carts) => {
		return res.status(200).json({
			success:true,
			data:carts 
		});
	})
	.catch((err) => {
		return res.status(500).json({
			message: err
		})
	})	
}

exports.createcart = function(req, res){
	console.log("calling createcart")
	
	var _cart = new Cart({
		tvcart: req.body.tvshows,
		moviecart: req.body.movies,
		phone_number: req.body.phone_number
	})
	_cart.save()
	.then(function(newCart){
		res.status(200).json({
			success:true,
			data:newCart
		});
	})
	.catch(function(err){
		res.status(500).json({
			message:err
		})
	})
}

