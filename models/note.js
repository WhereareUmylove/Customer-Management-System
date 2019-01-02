var mongoose = require('mongoose');
 var customer = new mongoose.Schema({
	customerss : String,
	remarks : String,  
	processtime:String,
	employee:String,
	content:String
});
var Pfuser = mongoose.model("Pfuser",customer);
var zhangsan= new Pfuser({

			"customerss" : "上海科技有限公司",
			"remarks" : "上海科技有限公司",
			"processtime":"2018-12-24",
			"employee":"张三",
			"content":"本来今天很高高兴兴"});

var wangwu= new Pfuser({
			"customerss" : "合肥科技有限公司",
			"remarks" : "合肥科技有限公司",
			"processtime":"2018-12-23",
			"employee":"王五",
			"content":"本来今天很高高兴兴"});

var zhaoliu= new Pfuser({
			"customerss" : "4AM电子竞技俱乐部",
			"remarks" : "4AM电子竞技俱乐部",
			"processtime":"2018-12-25",
			"employee":"赵六",
			"content":"本来今天很高高兴兴"});


//zhangsan.save();
//wangwu.save();
//zhaoliu.save();
module.exports =  Pfuser;