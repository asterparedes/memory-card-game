const pokeAPIBaseUrl = process.env.PARCEL_API_URL;

export default class ExternalData {
    getRandomPokemonId(limit = 12) {
        const pokemonId = 150;
        const randomIds = new Set();
        
        while (randomIds.size < limit) {
            const randomId = Math.floor(Math.random() * pokemonId) + 1;
            randomIds.add(randomId);
        }

        return Array.from(randomIds);
    }

    async getPokemonDetails(id) {
        const response = await fetch (`${pokeAPIBaseUrl}${id}`);
        const data = await response.json();
        
        return {
            name: data.name,
            image: data.sprites.other["official-artwork"].front_default,
        };
    }
}