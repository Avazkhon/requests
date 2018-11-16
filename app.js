const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({extended: true}))

const port = 2018;

const categories = [
	{id: 1 , name: "Food", count: 9},
	{id: 2 , name: "Drink", count: 4},
	{id: 3 , name: "Candy", count: 3}
];

var products = [
	{id: 1, name: "Beef", price: 42.69},
	{id: 2, name: "Cookiesf", price: 69.42},
];

 // вывод Hello*
app.get('/', function(req, res){
	res.send("Hello, Worl!" )
});

// вывод массива categories*
app.get('/categories', function(req, res){
	res.send(categories);
});

// вывод массива productucts*
app.get('/products', function(req, res){
	res.send(products);
});
//добавления categoriect*
app.post('/product', function(req, res) {
	 	const product = {
		id: Date.now(),
		name: req.body.name,
		price: req.body.price
		};
	products.push(product);
	res.sendStatus(201)
	console.log(product);

});

// вывод объекта по id*
app.get('/categori/:id', function(req, res){
	console.log(req.params);
	// найти совподения
	const categori = categories.find(function(categori) {
			return categori.id === Number(req.params.id);
	});
	res.send(categori);
});


// поиск по name*
app.get('/:name', function(req, res){
	const categori = categories.find(function(categori){
		return categori.name === req.params.name
	});
	res.send(categori);
	console.log(req.params.name);
})


// добавления в массив categories объекта*
app.post('/categori', function(req, res) {
	 	const categori = {
		id: Date.now(),
		name: req.body.name,
		count: req.body.count
		};
	categories.push(categori);
	res.sendStatus(201)
	console.log(categori);

});

 // изминения name в объекте
app.put('/categories/:id', function(req, res){
	// нати обект с id..
		const categori = categories.find(function(categori) {
			return categori.id === Number(req.params.id);
	});
		// изминения name
		categori.name = req.body.name;
		categori.count = req.body.count;
		res.sendStatus(200);
})

// удаления объекта с id..
app.delete('/products/:id', function (req, res) {
	 products = products.filter(function(product) {
		return product.id !== Number(req.params.id);
	});
	 res.sendStatus(200);
});

app.listen(port, function(){
	console.log(`API app startend! port: ${port}!`);
});