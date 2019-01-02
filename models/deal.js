var mongoose = require('mongoose');
var DealSchema = new mongoose.Schema({
	name : String,
	username : String,
	leader : String,
	estimated_amount:String,
	estimated_data:String,
	stage:String,
	create_time:String,
	share:String,
	shared:Boolean,
});
DealSchema.statics.insertUser = function(json,callback){
		
	var user = new Deal(json);
	user.save(function(err){
		if(err){
			callback(-2);  //服务器错误
			return;
		}
		//发回1这个状态
		callback(1);
	});

}
var Deal = mongoose.model("Deal",DealSchema);
var deal1 = new Deal({
	name : "企宝软件销售",
	username : "上海科技有限公司",
	leader : "张三",
	estimated_amount:"80.00",
	estimated_data:"2018-12-25",
	stage:"第一阶段",
	create_time:"2018-10-20",
	share:true,
	shared:false,
});
var deal2 = new Deal({
	name : "企业宝软件销售",
	username : "合肥科技有限公司",
	leader : "王五",
	estimated_amount:"100.00",
	estimated_data:"2018-12-25",
	stage:"第一阶段",
	create_time:"2018-10-20",
	share:false,
	shared:true,
});
var deal3 = new Deal({
	name : "企业宝软件销售",
	username : "北京科技有限公司",
	leader : "赵六",
	estimated_amount:"200.00",
	estimated_data:"2018-12-25",
	stage:"第一阶段",
	create_time:"2018-10-20",
	share:true,
	shared:false,
});
var deal4 = new Deal({
	name : "企业宝软件销售",
	username : "北京科技有限公司",
	leader : "赵六",
	estimated_amount:"54.00",
	estimated_data:"2018-12-25",
	stage:"第一阶段",
	create_time:"2018-10-20",
	share:false,
	shared:true,
});
//deal1.save();
//deal2.save();
//deal3.save();
//deal4.save();

module.exports=Deal;