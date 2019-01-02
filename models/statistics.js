var mongoose=require("mongoose");
//mongoose.connect('mongodb://localhost/crm');
var statisticsSchema=new mongoose.Schema({
    username:String,
    leader:String,
    province:String,
    city:String,
    create_time:String,
    next_time:String,
    allocation_time:String,
    finish_time:String
});
statisticsSchema.statics.insertData=function(json,callback){
    var s=new Statistics(json);
    s.save(function(err){
       if(err){
          callback(-2);//服务器错误
       }
       callback(1);//添加成功
    })
}
var Statistics=mongoose.model("Statistics",statisticsSchema);
module.exports = Statistics;
