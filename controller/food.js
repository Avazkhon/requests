let Food = require('../myModul/food')

exports.all = function (req, res,) {
  Food.all((err, doc)=>{
    if(err) {
	    console.log(err);
	}
    res.send(doc);
  } );
};

exports.create = function (req, res) {
  let categories = {
  	categori: req.body
  }

  Food.create(categories, (err, doc)=>{
    if(err) {
      console.log(err);
      res.sendStatus(500);
    };
    res.send(doc)
  });
};

exports.findById = function (req, res) {
  Food.findById(req.params.id, (err, doc)=>{
	if (err) {
	  console.log(err);
	  return res.sendStatus(500);
    }
     res.send(doc);
  })
}

exports.update = function (req, res) {
  Food.update(
    req.params.id,
    {categori: req.body},
    (err, result)=>{
      if(err) {
      	console.log(err);
      	return res.sendStatus(500)
      }
      res.sendStatus(200);
    }
  )
}

exports.delete = function (req, res) {
  Food.delete(
  	req.params.id,
  	(err, result)=>{
  	  if(err) {
  	  	console.log(err);
  	  	return res.sendStatus(500)
  	  }
  	  res.sendStatus(200)
  	}
  )
}