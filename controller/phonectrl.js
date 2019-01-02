var Phone = require("../models/phone.js");
var formidable = require("formidable");
var url = require("url");
exports.addUser=function(req,res){
	console.log("调用了");
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		console.log('接受到来自ajax的数据：' + fields);
		if(err){
			console.log("添加错误");
		}
		/*Phone.find({"phone":phone},function(result)){
			if(result){
				console.log("该手机已经注册！");
			}
		}*/
		Phone.insertPhone(fields,function(result){
			res.json({"result":result});
		})
	})
	
}
exports.getUser=function(req,res){
	console.log("查询数据");
	
	Phone.find({},function(err,result){
		res.json({"result":result});
	});
}
