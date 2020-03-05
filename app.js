var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Pokemon = require("./models/pokemonObj")

mongoose.connect("mongodb://localhost:27017/pokedex");
app.use(bodyParser.urlencoded({extended:true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));


app.get("/", function(req, res){
	res.render("landing");
});

app.get("/Pokemon", function(req, res){
	//get all pokemon from database to pokedex page
	 Pokemon.find({}, function(err, allPokemon){
		if(err){
			console.log(err)
		}
		else {
			res.render("pokemonList", {pokemons:allPokemon});
		}
	});
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