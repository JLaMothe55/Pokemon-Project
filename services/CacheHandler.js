var mongoose = require('mongoose');
var Pokemon = require('../models/pokemonObj');
var PokeAPI = require('./PokeAPI');

module.exports = function() {

    var OFFSET = 20;

    var getPokemonPaginated = function(page) {

        return new Promise(function(resolve, reject) {

            Pokemon.find({ id : { $gte: OFFSET * page }})
                .limit(OFFSET).sort('id').then(function(pokemonList) {

                if (pokemonList.length != OFFSET) {

                    return PokeAPI.getPaginatedList(page, OFFSET).then(function(newPokemonList) {

                        mongoose.connection.collection(Pokemon.collection.collectionName).insertMany(newPokemonList).then(function() {
                            return resolve(newPokemonList);
                        }).catch(err => reject(err));
                    }).catch(err => reject(err));
                }

                return resolve(pokemonList);

            }).catch(err => reject(err));
        });
    };

    return {
        getPokemonPaginated: getPokemonPaginated,
    };
}();