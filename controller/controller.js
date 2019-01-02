var User = require("../models/contact.js");
var url = require("url");
var MongoClient = require('mongodb').MongoClient;
var Statistics=require("../models/statistics.js");
var Pfuser = require("../models/note.js");
var Weixininfo=require("../models/weixin.js");
var formidable=require("formidable");
var deal = require("../models/deal.js")
var dburl = 'mongodb://192.168.24.53:27017/customer';

var Twfuser = require("../models/worksheet.js");

var dburlweixin = 'mongodb://192.168.24.53:27017/contact';
//var sheetdburl = 'mongodb://192.168.24.53:27017/customer';

exports.finddate = function(req, res) {
	var data=[];
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		Pfuser.find({}, function(err, result) {
			for(var i = 0; i < result.length; i++){
				if (Date.parse(result[i].processtime)>=fields.time) {
					data.push(result[i]);
				}
			}
			res.json({data:data});
		});

	});
}

exports.showContact = function(req, res) {
		User.find({}, function(err, data) { 

		res.render("contact", {data:data});
	})
}


exports.addCustomer = function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		MongoClient.connect(dburl, function(err, client) {
			if(err) {
				console.log("数据增加时：数据库没有链接成功！");
				return;
			}
			console.log("数据增加时：数据库连接成功");
			var db = client.db("customer");
			var currentTime = new Date();
			db.collection("customer").insertOne({
					name: fields.customerName,
					fuze: fields.customerFuze,
					type: fields.customerStyle,
					identity: fields.customerIdentity,
					city: fields.customerCity,
					creator: fields.customerCreator,
					currentTime: currentTime.toLocaleString()
				},
				function(err, r) {
					if(err) {
						console.log("数据插入失败!" + err.toString());
						return;
					}
					console.log("成功插入" + r.insertedCount + "条数据！");
					client.close();
				});
		});
	});
}


exports.showCustomer = function(req, res) {	
	MongoClient.connect(dburl, function(err, client) {
		if(err) {
			console.log("数据库链接失败！");
			return;
		}
		console.log("数据库连接成功");
		var db = client.db("customer");
		db.collection("customer").find().toArray(function(err, r) {
			if(err) {
				console.log("数据查询失败！");
				return;
			}
			
			res.render("customer", {
				data: r
			});
			client.close();
		});
	});
}

exports.deleteCustomer = function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		MongoClient.connect(dburl, function(err, client) {
			if(err) {
				console.log("删除时：数据库连接失败");
				return;
			}
			console.log("删除时：数据库连接成功");
			var db = client.db("customer");
			db.collection("customer").deleteMany({
				"name": fields.name
			}, function(err, r) {
				if(err) {
					console.log("删除数据失败！");
					return;
				}
				console.log(r + "删除成功");
				client.close();
			});
		});
	});
}

exports.changeCustomer = function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		MongoClient.connect(dburl, function(err, client) {
			if(err) {
				console.log("修改时：数据库连接失败");
				return;
			}
			console.log("修改时：数据库连接成功");
			var db = client.db("customer");
			db.collection("customer").updateOne({
					"name": fields.name
				}, {
					$set: {
						"type": fields.type
					}
				},
				function(err, r) {
					if(err) {
						console.log("修改数据失败！");
						return;
					}
					console.log("成功修改");
					client.close();
				});
		});
	});
}


exports.showWeixin = function(req, res) {
		MongoClient.connect(dburlweixin, function(err, db) {
		if(err) {
			console.log("数据库链接失败！");
			return;
		}
		console.log("数据库连接成功");
//		var db = client.db("weixininfos");
		db.collection("weixininfos").find({}).toArray(function(err, r) {
			if(err) {
				console.log("数据查询失败！");
				return;
			}
			console.log("获得数据"+r);
			res.render("weixin", {
				data: r
			});
			db.close();
		});
	});

//	res.render("weixin");
}

exports.deleteInfo = function(req, res) {
	var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {

		MongoClient.connect(dburlweixin, function(err, db) {

			if(err) {
				console.log("删除时：数据库连接失败");
				return;
			}
			console.log("删除时：数据库连接成功");
//			var db = client.db("weixin");
			console.log(fields.deleteName);
			db.collection("weixininfos").deleteOne({"weixinname":fields.deleteName}, function(err, r) {
				if(err) {
					console.log("删除数据失败！");
					return;
				}
				console.log("成功删除了" + r);
			    res.render("weixin", {
				data: r
			});
				db.close();
			});
		});
	});
}

exports.showNote = function(req, res) {
Pfuser.find({}, function(err, data) {
		res.render("note", {
			data: data
		});
	});
}
exports.showWorksheet = function(req, res) {
	Twfuser.find({}, function(err, data) {
		res.render("worksheet", {data: data});
	});
	
}
exports.addWorksheet = function(req, res) {
	var form = new formidable.IncomingForm();
	
	form.parse(req, function(err, fields, files) {
		console.log('接受到来自ajax的数据：' + fields);
		if(fields) {
			Twfuser.insertData(fields, function(result) {
				console.log(result);
			});
			
		}

	});

}






exports.findDeal = function(req, res) {
	console.log(req);
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		var obj = {};
		if(fields.stage) {
			obj.stage = fields.stage;
		}
		if(fields.leader) {
			obj.leader = fields.leader;
		}
		if(fields.create_time) {
			obj.create_time = fields.create_time;
		}
		if(fields.estimated_amount) {
			obj.estimated_data = fields.estimated_amount;
		}

		deal.find(obj, function(err, data) {
			console.log(data);
			res.render("deal", {
				data: data
			});
		})
	})
}

exports.deleteDeal = function(req, res) {

	console.log(req._parsedUrl.query);

	deal.find({
		_id: req._parsedUrl.query
	}, function(err, data) {
		console.log(data);
		data[0].remove();

	});
}
exports.showDeal = function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		// console.log(fields);
		deal.find({}, function(err, data) {
			res.render("deal", {
				data: data
			});
		});
	})
}

exports.addDeal = function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		console.log('接受到来自ajax的数据：' + fields);
		if(fields.id) {

			deal.find({
				_id: fields.id
			}, function(err, data) {

				var user = data[0];
				user.name = fields.name,
					user.username = fields.username,
					user.leader = fields.leader,
					user.estimated_amount = fields.estimated_amount,
					user.estimated_data = fields.estimated_data,
					user.stage = fields.stage,
					user.create_time = fields.create_time,
					user.share = fields.share,
					user.shared = fields.shared,
					console.log('修改完毕，开始做持久化！');
				user.save(function(err) {
					if(err) {
						res.json({
							"code": -1
						});
					} else {
						res.json({
							"code": 1
						});
					}
				});

			});

		} else {
			//数据库持久
			deal.insertUser(fields, function(result) {
				console.log("数据处理完成，得到code=" + result);
				res.json({
					"code": result
				});
			});
		}

	});

}

exports.showNone = function(req, res) {

	res.render("none");

}
var contactData=new Object();
exports.showStatistics = function(req, res) {
     res.render("statistics");
     User.find({}, function(err, data) { 
        contactData=data;	
	})
}

exports.statisticsCustomer=function(req,res){
	
    res.json({"result":contactData});
	
}

exports.contactSaveUser = function(req, res) {

	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {

		console.log('接受到来自ajax的数据：' + fields);

		if(fields.id) {

			User.find({
				_id: fields.id
			}, function(err, data) {

				var user = data[0];
				user.leader = fields.leader;
				user.job = fields.job;
				user.username = fields.username;
				user.create_time = fields.create_time;
				user.finish_time = fields.finish_time;
				user.share = fields.share;
				user.shared = fields.shared;

				user.save(function(err) {
					if(err) {
						res.json({
							"code": -1
						});
					} else {
						res.json({
							"code": 1
						});
					}
				});

			});

		} else {

			User.insertUser(fields, function(result) {
				console.log("数据处理完成，得到code=" + result);
				res.json({
					"code": result
				});
			});
		}

	});

}

exports.contactDeleteUser = function(req, res) {
	var ids = url.parse(req.url, true).query.ids;
	ids.split(',').forEach(function(id) {
		(function(idForDel) {
			User.find({
				_id: idForDel
			}, function(err, data) {
				console.log(data);
				data[0].remove();
			});
		})(id);

	});

}

exports.contactSearch = function(req, res) {
	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
		console.log(fields)
		User.find(fields, function(err, data) {
			res.render("contact", {
				data: data
			});
		})
	})
}


exports.contactSearchDate = function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		var date1 = Date.parse(fields.create_time[0]);
		var date2 = Date.parse(fields.create_time[1]);
		var datas = [];
		var finaldatas = []

		function fmtDate(obj) {
			var date = new Date(obj);
			var y = 1900 + date.getYear();
			var m = "0" + (date.getMonth() + 1);
			var d = "0" + date.getDate();
			return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
		}

		User.find({}, function(err, data) {
			for(let i = 0; i < data.length; i++) {
				if(Date.parse(data[i].create_time) > date1 && Date.parse(data[i].create_time) < date2) {
					datas.push(Date.parse(data[i].create_time));
					
				}
			}
			for(let i = 0; i < datas.length; i++) {
				finaldatas.push(fmtDate(datas[i]))
			}
			User.find({
				create_time: finaldatas
			}, function(err, data) {
				res.render("contact", {
					data: data
				});
			})

		})
	})
}

