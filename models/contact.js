var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    leader: String,
    job: String,
    username: String,
    create_time: String,
    finish_time: String,
    share: Boolean,
    shared: Boolean
});



UserSchema.statics.insertUser = function (json, callback) {
    var user = new User(json);
    user.save(function (err) {
        if (err) {
            callback(-2);  //服务器错误
            return;
        }
        //发回1这个状态
        callback(1);
    });

}


var User = mongoose.model("User", UserSchema);

var shanghai = new User({
    leader: "张三",
    job: "前台公关经理",
    username: "上海科技有限公司",
    create_time: "2018-10-20",
    finish_time: "2018-10-20",
    share: true,
    shared: false
})

var hefei = new User({
    leader: "王五",
    job: "前台员工",
    username: "合肥科技有限公司",
    create_time: "2018-10-20",
    finish_time: "2018-10-20",
    share: false,
    shared: true
})

var beijing = new User({
    leader: "赵六",
    job: "前台员工",
    username: "北京科技有限公司",
    create_time: "2018-10-20",
    finish_time: "2018-10-20",
    share: true,
    shared: false
})

var nanjing = new User({
    leader: "赵六",
    job: "前台员工",
    username: "南京科技有限公司",
    create_time: "2018-10-20",
    finish_time: "2018-10-20",
    share: false,
    shared: true
})

//  shanghai.save();
//  hefei.save();
//  beijing.save();
//  nanjing.save();
module.exports = User;
