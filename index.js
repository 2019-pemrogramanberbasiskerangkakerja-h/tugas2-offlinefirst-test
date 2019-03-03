var http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : true}));
app.use('/', router);

data = []

router.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+'/login.html'));
  //__dirname : It will resolve to your project folder.
});

router.post('/login', function(req, res) {
	var uname = req.body.username;
	var pass = req.body.password;
	console.log("Mencoba buat akun dengan nama pengguna", uname, "dengan password", pass);
});

router.get('/create_account',function(req,res){
  res.sendFile(path.join(__dirname+'/create_account.html'));
});

router.post('/create_account', function(req, res) {
	var uname = req.body.username;
	var pass = req.body.password;
	var confirm = req.body.password_confirm;
	console.log("Mencoba buat akun dengan nama pengguna", uname, "dengan password", pass, "konfirmasi pass", confirm);
});

//add the router

app.listen(process.env.port || 3000);

console.log('Running at Port 3000');