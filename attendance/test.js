var express = require("express");
var app = express();
app.get ("/",(req, res)=>{
    //res.send("welcome to node");
	const dt = new Date();

	res.send("It is now "+dt);
});
const PORT = 4001;//process.env.PORT || 4000;
console.log ("about to start");
app.listen(PORT, ()=>{
	
	console.log ("ok on port: "+PORT);
});

