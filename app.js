require('dotenv').config();

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Pokemon = require("./models/pokemonObj")
var CacheHandler = require('./services/CacheHandler');

mongoose.connect(process.env.MONGO_DSN);
app.use(bodyParser.urlencoded({extended:true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));


app.get("/", function(req, res){
	res.render("landing");
});

app.get("/Pokemon", function(req, res){
	//get all pokemon from database to pokedex page

	var page = 0;
	if (req.query.page && !Number.isNaN(req.query.page)) {
		page = Number(req.query.page);
	}

	CacheHandler.getPokemonPaginated(page).then(function(allPokemon) {
		return res.render('pokemonList', { pokemons: allPokemon });
	}).catch(err => console.error(err));
});

app.get("/Pokemon/new", function(req, res){
	res.render("addNewPokemon");
});


app.get("/Pokemon/:id", function(req, res){
	Pokemon.findById(req.params.id).exec(function(err, foundPokemon){
		if(err){
			console.log(err);
		}
		else{
			res.render("Pokemon", {pokemons:foundPokemon})
		};
	}); 
});


app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});