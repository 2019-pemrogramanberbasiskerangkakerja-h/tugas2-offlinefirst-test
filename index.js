var http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var bodyParser = require('body-parser');
var mariadb = require('mariadb');
var md5 = require('md5');

app.use(bodyParser.urlencoded({extended : true}));
app.use('/', router);

const pool = mariadb.createPool({
     host: '127.0.0.1', 
     user:'root', 
     database: 'pbkk_2',
     port: 3306
});


router.get('/', function(req, res){
	res.send("Hello World");
	//querying.query('select NOW()');
	//console.log(query.sql);
});
router.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+'/login.html'));
  //__dirname : It will resolve to your project folder.
});

router.post('/login', function(req, res) {
	var mkmk;
	var results;
	var uname = req.body.username;
	var pass = req.body.password;
	console.log("Mencoba login dengan nama pengguna", uname, "dengan password", pass);
	query = 'select password from users where username=' + "'" + uname + "'"
	console.log(query)
    pool.query(query)
    .then(results => {
    	mkmk = results[0].password;
    	console.log(mkmk);
    	console.log(md5(pass));
    	if (md5(pass) == mkmk) {
    		console.log('password benar');
    		res.redirect('/berhasillogin')
    	}
    	else {
    		console.log('password salah');
    		res.redirect('/gagallogin')
    	}
    }).catch(err => {
    	console.log(err);
    	res.redirect('/gagallogin');
    })
});

router.get('/berhasillogin',  function(req, res) {
	res.sendFile(path.join(__dirname+'/berhasillogin.html'));
});

router.get('/gagallogin',  function(req, res) {
	res.sendFile(path.join(__dirname+'/gagallogin.html'));
});

router.get('/create_account',function(req,res){
  res.sendFile(path.join(__dirname+'/create_account.html'));
});

router.post('/create_account', function(req, res) {
	var uname = req.body.username;
	var pass = req.body.password;
	var confirm = req.body.password_confirm;
	query = 'insert into users values(' + "'" +uname + "'" + ',' + 'md5(' +"'" + pass + "'"+ '))';
	console.log(query);
	pool.getConnection()
    .then(conn => {
    
      conn.query("SELECT 1 as val")
        .then((rows) => {
          console.log(rows); //[ {val: 1}, meta: ... ]
          //Table must have been created before 
          // " CREATE TABLE myTable (id int, val varchar(255)) "
          return conn.query(query);
        })
        .then((res) => {
          console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          conn.end();
        })
        .catch(err => {
          //handle error
          console.log(err); 
          conn.end();
        })
        
    }).catch(err => {
      //not connected
    });
    res.redirect("/suksesbuatakun");
	console.log("Mencoba buat akun dengan nama pengguna", uname, "dengan password", pass, "konfirmasi pass", confirm);
});

router.get('/suksesbuatakun', function(req, res){
	res.sendFile(path.join(__dirname+'/berhasilbuatakun.html'));
});
//add the router

app.listen(process.env.port || 3000);

console.log('Running at Port 3000');