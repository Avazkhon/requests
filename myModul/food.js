const ObjectID = require('mongodb').ObjectID;
let db = require('../db');


exports.all = function (colB) {
  db.get().collection("categories").find().toArray((err, doc)=>{
    colB(err, doc)
  });
}


exports.create = function(categori, colB) {
  db.get().collection("categories").insert(categori, (err, result)=>{
	  if(err) {
	  	console.log(err)
	  	return res.sendStatus(500)
	  }
	  colB(err, result)
  });
};

exports.findById = function (id, colB) {
  db.get().collection("categories").findOne({_id: ObjectID(id)}, (err, doc)=>{
    colB(err, doc);
  });
};

exports.update = function (id, newData, colB) {
  db.get().collection("categories").updateOne(
    {_id: ObjectID(id)},
    newData,
    (err, result)=>{
      colB(err, result);
    }
  );
};

exports.delete = function (id, colB) {
  db.get().collection("categories").deleteOne(
    {_id: ObjectID(id)},
    (err, result)=>{
      colB(err, result)
    }
  )
}