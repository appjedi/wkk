var express = require("express");
var app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
var mysql = require('mysql');
const config={
  host: "127.0.0.1",
  port: "3306",
  user: "appjedin_clark",
  password: "ClarkData$2020",
  database: "appjedin_timslist",
connectionLime:10
};

//config.connectionLimit = 10;
var connection = mysql.createPool(config);

app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static('public'));
app.get ("/",(req, res)=>{
    //res.send("welcome to node");
	res.sendFile('index.html');
});
app.get ("/users",(req, res)=>{
     var query = `
  SELECT * FROM users
`;
connection.query(query, function(err, rows, fields) {
  if (err){
     console.log(err);
    res.end (err);
  }
  else {
    res.json(rows);
  }
}); 
});
app.get ("/hello",(req, res)=>{
    res.send("hello");
});
app.get("/login",  (req, res) =>{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h3>Login:</h3><form action="login" method="post">');
    res.write('Username: <input type="text" name="username" placeholder="username"><br/><br/>');
    res.write(' Password: &nbsp;<input type="password" name="password" placeholder="password"><br/>');
    res.write('<p><input type="submit" value="Login"></p>');
    res.write('</form>');
    res.end();
});
app.post ("/login", (req, res) =>{
	const user = {
		username: req.body.username,
		password: req.body.password
	};
    console.log(user);
	//res.cookie('user', user.username).send("logged in");
	//res.json(user);
	res.send(user);
});
const PORT = 4001;//process.env.PORT || 4000;
console.log ("about to start");
app.listen(PORT, ()=>{
	console.log ("ok on port: "+PORT);
});

