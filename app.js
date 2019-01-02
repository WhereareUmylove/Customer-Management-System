var express = require('express');
var app = express();
var session = require('express-session');
var controller = require("./controller/controller.js");
var phonectrl = require("./controller/phonectrl.js");
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/mydatabase');
mongoose.connect('mongodb://192.168.24.53/contact');
mongoose.connection.on('connected', function () {
    console.log('连接成功');

});
mongoose.connection.on('error', function (err) {
    console.log('连接异常');
});

mongoose.connection.on('disconnected', function () {
    console.log('连接断开');
});

app.use(session({ 
	secret: 'CRM', 
	cookie: { maxAge: 60000 * 30 } ,
	resave:false ,  
	saveUninitialized: true,
}));


app.set("view engine", "ejs");

app.get('/', controller.showLogin);//根路由（登录）
app.get('/login',controller.showLogin);//登录界面
app.get('/login/getUser',phonectrl.getUser);//登录界面
app.get('/register',controller.showRegister);
app.post('/register/addUser',phonectrl.addUser);//注册界面插入数据


app.get('/contact/delete', controller.contactDeleteUser);
app.post('/contact/save', controller.contactSaveUser);
app.post('/contact/search', controller.contactSearch);
app.post('/contact/searchdate', controller.contactSearchDate);
//app.get('/', controller.showCustomer);//根路由（客户）



app.get('/customer', controller.showCustomer);//客户路由
app.post('/customer/addCustomer', controller.addCustomer);//增加客户路由
app.post('/customer/deleteCustomer', controller.deleteCustomer);//删除客户路由
app.post('/customer/changeCustomer', controller.changeCustomer);//修改客户路由

app.get('/worksheet', controller.showWorksheet);//工单路由
app.post('/worksheet/addWorksheet', controller.addWorksheet);//增加工单路由
//app.post('/worksheet/deleteWorksheet', controller.deleteWorksheet);//删除工单路由

app.get('/contact', controller.showContact);//联系人路由
app.get('/weixin', controller.showWeixin);//微信路由
app.get('/note', controller.showNote);//跟进记录路由
app.post('/note/finddate', controller.finddate);

app.get('/deal', controller.showDeal);//销售机会路由




app.get('/deal/delete', controller.deleteDeal);//销售机会路由

app.post('/deal/find', controller.findDeal);


app.get('/statistics/customer', controller.showStatistics);//统计分析路由

app.get('/statistics/statisticsCustomer', controller.statisticsCustomer);//统计分析路由查询数据


app.use(express.static(__dirname + '/public'));

app.get('*', controller.showNone); //404路由

app.listen(3000);
console.log("企客宝端口启动");
