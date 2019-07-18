//gute Webseite: https://vegibit.com/node-js-express-rest-api-tutorial/
/*
zu verbessern / ergänzen:
- Authentifizierung
*/

//import express-Framework
var express = require("express");
var app = express();

//import mysql-Framework + SQL-Connection
var mysql = require("mysql");
var connection = mysql.createConnection({
	host: "localhost",
	user: "monitoringuser",
	password: "1234",
	database: "monitoring"
});

//import Body-Parser
var bodyParser = require("body-parser");



//Server-Konfiguration
var port = 8080;
var homefolder = "website/";


//Body-Parser initialisierung (resp. anbindung an App-Variable)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


//return Index
app.get("/", function (req, res){
	res.sendfile(homefolder + "index.html");
});


//return aller Applications aus SQL-DB
app.get("/api/application/", function(req,res){
		
	connection.query("select * from application", function(err, rows, fields){
		
		if(err){
			throw err;
		}
		
		res.send(rows);
	});
	
});

//return bestimmter Application aus SQL-DB
app.get("/api/application/:id", function(req,res){
	
	console.log(parseInt(req.params.id));
	
	connection.query("select * from application", function(err, rows, fields){
		if(err){
			throw err;
		}
		
		res.send(rows[parseInt(req.params.id)]);
	});
	
});

//Manipulation der Applikations-Statusse
app.put("/api/application/:id", function(req,res){

	/*
		Nachfolgend werden folgende Request gemacht:
		- req.body.problem
		- req.body.auswirkung
		- req.body.loesung
		- req.body.termin
		- req.params.id
	*/
	
	connection.query("update application set Problem =" + req.body.problem + " , Auswirkung=' " + req.body.auswirkung + " ', Loesung=' " + req.body.loesung + " ', VorraussichtlicherTermin = " + req.body.termin + " where ApplicationID = " + req.params.id + ";", function(err, rows, fields){
	
		if(err){
			throw err;
		}
		
		res.send("Update completed!");
		
	});
	
	/*
	console.log("Header: " + JSON.stringify(req.headers));
	
	console.log(req.headers);
	
	console.log(req.params.id);
	
	console.log(req.body.application);
	*/
});

//Handling aller anderer Seiten, welche die Webseite betreffen
app.get(/^(.+)$/, function(req,res){
	res.sendfile( homefolder + req.params[0]);
});

//Error-Handling, wenn Webseite nicht existiert
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

//Definition auf welchem Port der Server 'hört'
app.listen(port);