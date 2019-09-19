/********************************************************************************************
    Name: Brian Laccone
    Class: CS 290
    Date: 11/12/2017
    HW Assignment: GET and POST checker
*********************************************************************************************/

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var handlebars = require("express-handlebars").create({defaultLayout: "main"});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 9423);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res)
{
	var qParams = [];
	for (var p in req.query) 
    {
		qParams.push({"name": p, "value": req.query[p]});
	}
	var foo = {};
	foo.dataList = qParams;
	res.render("get", foo);
});

app.post("/", function(req, res)
{
	var qParams = [];
	for (var p in req.query)
    {
		qParams.push({"name": p, "value": req.query[p]});
	}
    var bParams = [];
	for (var b in req.body) 
    {
		bParams.push({"name": b, "value": req.body[b]});
	}
	var foo = {};
	foo.queryList = qParams;
    foo.bodyList = bParams;
	res.render("post", foo);                  
});

app.use(function(req, res){
	res.status(404);
	res.render("404");
});

app.use(function(err, req, res, next){
	console.log(err.stack);
	res.status(500);
	res.render("500");
});

app.listen(app.get("port"), function(){
	console.log("Express started on port 9423");
});