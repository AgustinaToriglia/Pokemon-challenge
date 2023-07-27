import { Pokemon } from '../models/pokemon.mjs';

export default async function getPokemon(id) {
    const pokemon = await Pokemon.findById(id);
    if (pokemon == null) {
        return new Error('pokemon not found');
    }
    return pokemon;
}