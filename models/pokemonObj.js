var mongoose = require ("mongoose");

var pokemonSchema = new mongoose.Schema({
	id: Number,
	name: String,
	image: String,
	sprites: Array,
});

module.exports = mongoose.model("Pokemon", pokemonSchema);