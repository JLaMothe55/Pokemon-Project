var mongoose = require ("mongoose");

var pokemonSchema = new mongoose.Schema({
	name: String,
	image: String
});

module.exports = mongoose.model("Pokemon", pokemonSchema);