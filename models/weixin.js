var mongoose = require('mongoose');
var weixinxx = new mongoose.Schema({
	id : Number,
	weixinname : String,
	custome : String,  
	username:String,
	sex:String,
	phone:Number,
	address:String,
	weixin:String,
	employee:String,
	creatTime:String
});

var Weixininfo = mongoose.model("Weixininfo",weixinxx);
var aa= new Weixininfo({
	        
	        "weixinname" : "客户1的微信",
	        "custome" : "w公司",  
	        "username":"小明",
	        "sex":"男",
	        "phone":18845612345,
	        "address":"北京",
	        "weixin":"员工张三的微信",
	        "employee":"张三",
	        "creatTime":"2018-12-10"});

var bb= new Weixininfo({
	        
	        "weixinname" : "客户2的微信",
	        "custome" : "x公司",  
	        "username":"小红",
	        "sex":"女",
	        "phone":17756478965,
	        "address":"南京",
	        "weixin":"员工张三的微信",
	        "employee":"张三",
	        "creatTime":"2017-10-05"});

var cc= new Weixininfo({
	        
	        "weixinname" : "客户3的微信",
	        "custome" : "y公司",  
	        "username":"小刚",
	        "sex":"男",
	        "phone":16598563214,
	        "address":"上海",
	        "weixin":"员工张三的微信",
	        "employee":"张三",
	        "creatTime":"2016-05-21"});

var dd= new Weixininfo({
	        
	        "weixinname" : "客户4的微信",
	        "custome" : "z公司",  
	        "username":"肖明",
	        "sex":"男",
	        "phone":15562486545,
	        "address":"山东",
	        "weixin":"员工李四的微信",
	        "employee":"李四",
	        "creatTime":"2018-12-10"});

var ee= new Weixininfo({
	        
	        "weixinname" : "客户5的微信",
	        "custome" : "l公司",  
	        "username":"肖红",
	        "sex":"女",
	        "phone":17865423545,
	        "address":"陕西",
	        "weixin":"员工李四的微信",
	        "employee":"李四",
	        "creatTime":"2017-02-12"});

var ff= new Weixininfo({
	        "weixinname" : "客户6的微信",
	        "custome" : "c公司",  
	        "username":"小白",
	        "sex":"女",
	        "phone":16954236874,
	        "address":"云南",
	        "weixin":"员工李四的微信",
	        "employee":"李四",
	        "creatTime":"2018-12-26"});	        
var gg= new Weixininfo({
	        "weixinname" : "客户7的微信",
	        "custome" : "v公司",  
	        "username":"小黑",
	        "sex":"女",
	        "phone":15498746354,
	        "address":"东北",
	        "weixin":"员工王五的微信",
	        "employee":"王五",
	        "creatTime":"2016-02-26"});
var hh= new Weixininfo({
	        "weixinname" : "客户8的微信",
	        "custome" : "g公司",  
	        "username":"小黄",
	        "sex":"女",
	        "phone":19965485126,
	        "address":"江西",
	        "weixin":"员工赵六的微信",
	        "employee":"赵六",
	        "creatTime":"2018-06-12"});
var ii= new Weixininfo({
	        "weixinname" : "客户9的微信",
	        "custome" : "m公司",  
	        "username":"小绿",
	        "sex":"男",
	        "phone":15456563245,
	        "address":"陕西",
	        "weixin":"员工赵六的微信",
	        "employee":"赵六",
	        "creatTime":"2016-02-26"});	        
//aa.save();
//bb.save();
//cc.save();
//dd.save();
//ee.save();
//ff.save();
//gg.save();
//hh.save();
//ii.save();
module.exports = Weixininfo;