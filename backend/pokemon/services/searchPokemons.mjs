import { Pokemon } from '../models/pokemon.mjs';

export default async function searchPokemons(name, page, pageSize) {
    const query = {}
    if (name) {
        query.name = { $regex: name, $options: 'i' };
    }

    const totalPokemons = await Pokemon.countDocuments(query);
    const totalPages = Math.ceil(totalPokemons / pageSize);

    if (page < 1) {
        throw new Error('Página no encontrada')
    }

    if (totalPages === 0) {
        return {
            pokemons: [],
            current_page: page,
            total_pages: 0,
        }
    }

    const pokemons = await Pokemon.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize);

    return {
        pokemons,
        current_page: page,
        total_pages: totalPages,
    }
}