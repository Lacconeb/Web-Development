/********************************************************************************************
    Name: Brian Laccone
    Class: CS 290
    Date: 11/30/2017
    HW Assignment:Database interactions and UI
*********************************************************************************************/

//some code was inspired from stack overflow

var express = require("express");
var app = express();
var bodyParser = require("body-parser"); 
var handlebars = require("express-handlebars").create({defaultLayout: "main"});
var mysql = require("mysql");

//recreate the pool that was created during the first week of class
//week1 dbcon.js
var pool = mysql.createPool({
    host: "classmysql.engr.oregonstate.edu",
    user: "cs290_lacconeb",
    password: "3956",
    database: "cs290_lacconeb"
});

module.exports.pool = pool;

//took this code from a past assignment
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 7951);                              
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

//Allows us to reset table
//given in hw assignment
//I'm not sure if this is exactly working properly
app.get('/reset-table',function(req,res,next){
    var context = {};
    pool.query("DROP TABLE IF EXISTS workouts", function(err){
        var createString = "CREATE TABLE workouts("+
        "id INT PRIMARY KEY AUTO_INCREMENT,"+
        "name VARCHAR(255) NOT NULL,"+
        "reps INT,"+
        "weight INT,"+
        "date DATE,"+
        "lbs BOOLEAN)";
        pool.query(createString, function(err){
            res.render('table',context);
        })
    });
});

//used to select contents of table and display them
app.get('/', function(req, res, next){

    var context = {};
    pool.query('SELECT * FROM workouts', function(err, rows, fields){

    //if there is a problem
    if(err){ 
        next(err);
        return;
    }

    var params = [];
    for(var row in rows){
        var addItem = {'name': rows[row].name, 
                    'reps': rows[row].reps, 
                    'weight': rows[row].weight, 
                    'date':rows[row].date, 
                    'id':rows[row].id};
        if(rows[row].lbs){
            addItem.lbs = "lbs";
        }else{
            addItem.lbs = "kg";
        }
        params.push(addItem); 
    }
    context.results = params;

    //display table
    res.render('table', context);
    })
});

//used to insert into the table
app.get('/insert',function(req,res,next){

    //taken from lecture
    var context = {};
    pool.query("INSERT INTO `workouts` (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)", 
        [req.query.exercise,
        req.query.reps, 
        req.query.weight, 
        req.query.date, 
        req.query.unitCheck], 
    function(err, result){
        if(err){
          next(err);
          return;
        }         
        context.inserted = result.insertId;
        res.send(JSON.stringify(context));
  });
});

//used to delete the row in the table with the correct id
app.get('/delete', function(req, res, next) {
    var context = {};
    //require id
    pool.query("DELETE FROM `workouts` WHERE id = ?",
        [req.query.id], 
        function(err, result) {
            if(err){
                next(err);
                return;
            }
    });
});

//used to update the table with the correct id
app.get('/updateTable',function(req, res, next){
    var context = {};
    //require id
    pool.query('SELECT * FROM `workouts` WHERE id=?',
        [req.query.id], 
        function(err, rows, fields){
            if(err){
                next(err);
                return;
            }
            var param = [];

            for(var row in rows){
                var addItem = {'name': rows[row].name, 
                            'reps': rows[row].reps, 
                            'weight': rows[row].weight, 
                            'date':rows[row].date, 
                            'lbs':rows[row].lbs,
                            'id':rows[row].id};

                param.push(addItem);
            }

        context.results = param[0];
        res.render('updateTable', context);
    });
});

app.get('/updateReturn', function(req, res, next){
    var context = {};
    //require id
    pool.query("SELECT * FROM `workouts` WHERE id=?",
        [req.query.id], 
        function(err, result){
            if(err){
                next(err);
                return;
            }
            if(result.length == 1){                
                var current = result[0];

                
                if(req.query.unitCheck === "on"){
                    req.query.unitCheck = "1";
                }
                else{
                    req.query.unitCheck = "0";
                }

                pool.query('UPDATE `workouts` SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?',
                [req.query.exercise || current.name, 
                req.query.reps || current.reps, 
                req.query.weight || current.weight, 
                req.query.date || current.date, 
                req.query.unitCheck, 
                req.query.id],
                function(err, result){
                    if(err){
                        next(err);
                        return;
                    }

                    pool.query('SELECT * FROM `workouts`', function(err, rows, fields){     
                        if(err){
                            next(err);
                            return;
                        }
                        var param = [];

                        for(var row in rows){
                            var addItem = {'name': rows[row].name,
                            'reps': rows[row].reps,
                            'weight': rows[row].weight, 
                            'date':rows[row].date, 
                            'id':rows[row].id};

                            //deciding whether it is lbs or kgs
                            if(rows[row].lbs){
                                addItem.lbs = "lbs";
                            }
                            else{
                                addItem.lbs = "kgs";
                            }
                            //push items to be displayed
                            param.push(addItem);
                        }

                        context.results = param;
                        //display it all
                        res.render('table', context);
                    });
                });
            }
    });
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
	console.log("Express started on port 7951");
});
