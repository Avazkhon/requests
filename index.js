const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID

const app = express();
let db;

app.use(bodyParser.json());
app.use(bodyParser.json({extended: true}))

const port = 2018;

 // вывод Hello*
app.get('/', function(req, res){
	res.send("Hello, Worl!" )
});

// вывод массива categories
app.get('/categories', function(req, res){
	db.collection("categories").find().toArray((err, doc)=>{
		if(err) {
			console.log(err)
			return res.sendStatus(500)
		}
		res.send(doc)
	});
});

// вывод объекта по id
app.get('/categori/:id', function(req, res){
	db.collection("categories").findOne({_id: ObjectID(req.params.id)}, (err, doc)=>{
		if(err) {
			console.log(err);
			return res.sendStatus(500)
		}
		res.send(doc)
	})
});

 // изминения name в объекте
app.put('/categori/:id', function(req, res){
	db.collection("categories").updateOne(
		{_id: ObjectID(req.params.id)},
		{name: req.body.name},
		(err, doc)=>{
		if(err){
			console.log(err)
			return res.sendStatus(500)
		}
		res.send(doc);
	})
})

// добавления в массив categories объекта
app.post('/categories', function(req, res) {
	 	const categori = {
		name: req.body.name,
		count: req.body.count
		};
	db.collection("categories").insert(categori, (err, docs)=>{
		if(err) {
			console.log(err)
			return res.sendStatus(500)
		}
		res.send(docs.ops)
	})

});

// удаления объекта с id..
app.delete('/categories/:id', function (req, res) {
	db.collection("categories").deleteOne(
	  {_id: ObjectID(req.params.id)},
	   function(err, result) {
 		  if(err) {
	      console.log(err)
	   	  return res.sendStatus(500);
	   	  }
	   	  res.sendStatus(200)
	   	}
	)
});

//добавления product
app.post('/product', function(req, res) {
 	const product = {
	name: req.body.name,
	price: req.body.price
	};

	db.collection("product").insert(product, (err, docs)=>{
		if(err) {
			console.log(err)
			return res.sendStatus(500)
		}
		res.send(docs.ops)
	})

});

// вывод массива product
app.get('/product', function(req, res){
	db.collection("product").find().toArray((err, doc)=>{
		if(err) {
			console.log(err)
			return res.sendStatus(500)
		}
		res.send(doc)
	});
});

// удаления объекта с id..
app.delete('/product/:id', function (req, res) {
	db.collection("product").deleteOne(
	  {_id: ObjectID(req.params.id)},
	   function(err, result) {
 		  if(err) {
	      console.log(err)
	   	  return res.sendStatus(500);
	   	  }
	   	  res.sendStatus(200)
	   	}
	)
});

MongoClient.connect('mongodb://localhost:27017', (err, database)=>{
	if(err) {
		return console.log(err)
	}
	db = database;
	app.listen(port, function(){
		console.log(`API app startend! port: ${port}!`);
	});
})