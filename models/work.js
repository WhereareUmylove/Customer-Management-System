var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://192.168.24.53/workSheet';
 var workSheet = new mongoose.Schema({
	workSheets : String,
	remarks : String,  
	processtime:String,
	employee:String,
	content:String
});

exports.showworkSheet = function(req, res) {

	MongoClient.connect(dburl, function(err, client) {
		if(err) {
			console.log("数据库链接失败！");
			return;
		}
		console.log("数据库连接成功");
		var db = client.db("workSheet");
		db.collection("workSheet").find().toArray(function(err, r) {
			if(err) {
				console.log("数据查询失败！");
				return;
			}
			res.render("workSheet", {
				data: r
			});
			client.close();
		});
	});
}

exports.deleteworkSheet = function(req, res) {

	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		MongoClient.connect(dburl, function(err, client) {
			if(err) {
				console.log("删除时：数据库连接失败");
				return;
			}
			console.log("删除时：数据库连接成功");
			var db = client.db("workSheet");
			db.collection("workSheet").deleteMany({"name":fields.name}, function(err, r) {
				if(err) {
					console.log("删除数据失败！");
					return;
				}
				console.log("成功删除了" + r.deletedCount + "条数据");
				client.close();
			});
		});
	});

}


module.exports =  User;