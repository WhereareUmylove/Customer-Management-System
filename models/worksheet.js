var mongoose = require('mongoose');
 var worksheet = new mongoose.Schema({
	title : String,
	statue : String,  
	postpeople:String,
	createtime:String,
	dealtime:String
});
worksheet.statics.insertData=function(json,callback){
    var twfuser=new Twfuser(json);
    twfuser.save(function(err){
       if(err){
          callback(-2);//服务器错误
       }
       callback(1);//添加成功
    })
}

var Twfuser = mongoose.model("Twfuser",worksheet);
var zhangsan=new Twfuser({
			"title" : "五五开牛皮",
			"statue" : "true",
			"postpeople":"Godv",
			"createtime":"2016-12-21",
			"dealtime":"2018-12-26"});

var wangwu=new Twfuser({
			"title" : "骚男真6",
			"statue" : "false",
			"postpeople":"Loinkk",
			"createtime":"2017-12-23",
			"dealtime":"2018-12-28"});

var zhaoliu=new Twfuser({
			"title" : "17牛皮",
			"statue" : "true",
			"postpeople":"17shou",
			"createtime":"2016-12-13",
			"dealtime":"2017-12-23"});
			
var twf= new Twfuser({
			"title" : "五五开牛皮",
			"statue" : "false",
			"postpeople":"Godv",
			"createtime":"2016-12-23",
			"dealtime":"2018-12-25"});
var twfson= new Twfuser({
			"title" : "骚猪牛皮",
			"statue" : "true",
			"postpeople":"Godv",
			"createtime":"2016-12-23",
			"dealtime":"2018-12-27"});
//zhangsan.save();
//twfson.save();
//twf.save();
//zhaoliu.save();
//wangwu.save();
module.exports =Twfuser;