const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
let db = require('./db');
let FoodControll = require('./controller/food')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({extended: true}))

const port = 2018;

 // вывод Hello*
app.get('/', function(req, res){
	res.send("Hello, Worl!" )
});

// вывод массива categories
app.get('/categories', FoodControll.all)

// вывод объекта по id
app.get('/categori/:id', FoodControll.findById)

 // изминения name в объекте
app.put('/categori/:id', FoodControll.update)

// добавления в массив categories объекта
app.post('/categories', FoodControll.create)

// удаления объекта с id..
app.delete('/categori/:id', FoodControll.delete )

//добавления product
app.post('/product', function(req, res) {
 	const product = {
	name: req.body.name,
	price: req.body.price
	};

	db.get().collection("product").insert(product, (err, docs)=>{
		if(err) {
			console.log(err)
			return res.sendStatus(500)
		}
		res.send(docs.ops)
	})

});

// вывод массива product
app.get('/product', function(req, res){
	db.get().collection("product").find().toArray((err, doc)=>{
		if(err) {
			console.log(err)
			return res.sendStatus(500)
		}
		res.send(doc)
	});
});

// удаления объекта с id..
app.delete('/product/:id', function (req, res) {
	db.get().collection("product").deleteOne(
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

db.connect('mongodb://localhost:27017', (err)=>{
	if(err) {
		return console.log(err)
	}
	app.listen(port, function(){
		console.log(`API app startend! port: ${port}!`);
	});
})