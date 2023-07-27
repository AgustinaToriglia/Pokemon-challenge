import doGetPokemon from './getPokemon.mjs';

export default async function deletePokemon(id, data) {
    const pokemon = await doGetPokemon(id);

    return await pokemon.remove();
}