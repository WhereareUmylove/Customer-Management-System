var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase');
var Schema = mongoose.Schema;
var PhoneSchema = new Schema({
	phone : String,
	password  : String
});

PhoneSchema.statics.insertPhone = function(json,callback){		
	var phone = new Phone(json);
	phone.save(function(err){
		if(err){
			callback(-2); 
			return;
		}
		callback(1);
	});

}

var Phone = mongoose.model("Phone",PhoneSchema);
module.exports = Phone;
//
//var Admin = new Phone();
//
//Admin.save();
//
//
//
//var Phone = mongoose.model("Phone",PhoneSchema);
//
