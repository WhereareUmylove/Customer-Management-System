var dburl = 'mongodb://192.168.24.53:27017/customer';
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(dburl, function(err, client) {
	if(err) {
		console.log("数据库连接失败");
		return;
	}
	console.log("连接成功");
	var db = client.db("customer");
	db.collection("customer").deleteMany({}, function(err, r) {
		if(err) {
			console.log("删除数据失败！");
			return;
		}
		console.log("成功删除了" + r.deletedCount + "条数据");
		client.close();
	});
});