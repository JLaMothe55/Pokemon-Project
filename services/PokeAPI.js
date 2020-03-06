var fetch = require('node-fetch');

module.exports = function() {

    var domain = 'https://pokeapi.co/api/v2'

    var getPaginatedList = function(page, limit) {
        
        var offset = page * limit;
        var target = `${domain}/pokemon?offset=${offset}&limit=${limit}`;

        console.log('Calling...', target);

        return fetch(target).then(function(res) {
            return res.json();
        }).then(function(res) {

            var pokemonObjects = [];

            res.results.forEach(function(pokemonIndex) {
                pokemonObjects.push(
                    fetch(pokemonIndex.url).then(function(res) {
                        return res.json();
                    })
                );
            });

            return Promise.all(pokemonObjects);
        });
    };

    return {
        getPaginatedList: getPaginatedList
    };
}();