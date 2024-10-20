const pokeAPIBaseUrl = "https://pokeapi.co/api/v2/pokemon/";

export default class ExternalData {
    async getPokemonData(limit = 12) {
        const response = await fetch(`${pokeAPIBaseUrl}?limit=${limit}`);
        const data = await response.json();
        
        return data.results;
    }

    async getPokemonDetails(url) {
        const response = await fetch (url);
        const data = await response.json();
        
        return {
            name: data.name,
            image: data.sprites.front_default,
        };
    }
}