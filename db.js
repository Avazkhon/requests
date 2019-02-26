const MongoClient = requre('mongodb').MongoClient;

let state = {
	db: null
}

exports.connect = (url, done)=> {
	if(state.db) {
		return done();
	}

	MongoClient.connect(url, (err, database) => {
		if(err) {
			return done(err);
		}
		state.db = database;
		done()
	});
};

exports.get = function () {
	return state.db
};