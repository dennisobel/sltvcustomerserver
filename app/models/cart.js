var mongoose = require("mongoose")
//var userSchema = require("./user")

mongoose.Promise = global.Promise;

var CartSchema = new mongoose.Schema({
	tvcart: Array,
	moviecart: Array,
	phone_number: String
})

console.log("calling CartSchema")

//var User = mongoose.model("User", userSchema.UserSchema)

module.exports = mongoose.model("Cart", CartSchema)