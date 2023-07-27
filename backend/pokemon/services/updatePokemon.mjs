import doGetPokemon from './getPokemon.mjs';

export default async function updatePokemon(id, data) {
    const pokemon = await doGetPokemon(id);
    if (data.name) {
        pokemon.name = data.name;
    }

    if (data.type) {
        pokemon.type = data.type;
    }

    return await pokemon.save();
}