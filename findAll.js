var dburl = 'mongodb://192.168.24.53:27017/customer';
var MongoClient = require('mongodb').MongoClient;
	MongoClient.connect(dburl, function(err, client) {
		if(err) {
			console.log("错误！数据库没有链接成功！");
			return;
		}
		console.log("数据库连接成功");
		var db = client.db("customer");
		db.collection("customer").find().toArray(function(err, r) {
			if(err) {
				console.log("数据查询失败！");
				return;
			}
			console.log(r);
			client.close();
		});
	});