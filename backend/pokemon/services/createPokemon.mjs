import { Pokemon } from '../models/pokemon.mjs'
import doSearchPokemons from './searchPokemons.mjs';

export default async function createPokemon(data) {
    const resp = await doSearchPokemons(data.name, 1, 1);
    if (resp.pokemons.length > 0) {
        throw new Error("pokemon " + data.name + " already exists")
    }
    
    const pokemon = new Pokemon({
        name: data.name,
        type: data.type,
        number: data.number,
        attack_value: data.attack_value,
        defense_value: data.defense_value,
        image_url: data.image_url,
    });

    try {
        return await pokemon.save();
    } catch (err) {
        throw new Error("error saving pokemon: " + err.message);
    }
}