var http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var bodyParser = require('body-parser');
var mariadb = require('mariadb');
var md5 = require('md5');
var session = require('express-session');
var sess;

app.use(bodyParser.urlencoded({extended : true}));

const pool = mariadb.createPool({
     host: '127.0.0.1', 
     user:'root', 
     database: 'pbkk_2',
     port: 3306
});

app.use(session({secret: 'ssshhhhh'}));

app.use('/', router);

router.get('/', function(req, res){
	/*if (req.session.page_views) {
		req.session.page_views++;
		console.log(req.session.page_views);
		res.send("You visited this page " + req.session.page_views + " times");
	}*/
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
	//console.log(req.session.username);
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
	console.log("Mencoba buat akun dengan nama pengguna", uname, "dengan password", pass, "konfirmasi pass", confirm);
	query = 'insert into users values(' + "'" +uname + "'" + ',' + 'md5(' +"'" + pass + "'"+ '))';
	if (pass != confirm) {
		res.redirect('/gagalbuatakun');
	}
	else {
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
	          res.redirect("/suksesbuatakun");
	          conn.end();
	        })
	        .catch(err => {
	          //handle error
	          console.log(err);
	          res.redirect("/gagalbuatakun"); 
	          conn.end();
	        })
	        
	    }).catch(err => {
	      //not connected
	    });
	}
});

router.get('/gagalbuatakun', function(req, res) {
	res.sendFile(path.join(__dirname+'/gagalbuatakun.html'));
});

router.get('/suksesbuatakun', function(req, res){
	res.sendFile(path.join(__dirname+'/berhasilbuatakun.html'));
});
//add the router

app.listen(process.env.port || 3000);

console.log('Running at Port 3000');