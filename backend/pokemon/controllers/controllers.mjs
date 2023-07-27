import { presentPokemon } from '../models/pokemon.mjs';
import doGetPokemon from '../services/getPokemon.mjs';
import doSearchPokemons from '../services/searchPokemons.mjs';
import doUpdatePokemon from '../services/updatePokemon.mjs';
import doDeletePokemon from '../services/deletePokemon.mjs';
import doCreatePokemon from '../services/createPokemon.mjs';
import { PokemonType } from '../models/types.mjs';

export async function updatePokemon(req, res) {
    try {
        const id = req.params.id;

        const pokemon = await doUpdatePokemon(id, {
            name: req.body.name,
            type: req.body.type
        });

        return res.json(presentPokemon(pokemon));
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export async function searchPokemons(req, res) {
    const pageSize = parseInt(req.query.page_size) || 10;
    const page = parseInt(req.query.page) || 1;
    const name = req.query.name;

    try {
        const resp = await doSearchPokemons(name, page, pageSize)

        res.json({
            pokemons: resp.pokemons.map(pokemon => presentPokemon(pokemon)),
            current_page: resp.current_page,
            page_size: resp.page_size,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getPokemon(req, res) {
    try {
        const id = req.params.id;
        const pokemon = await doGetPokemon(id)
        if (pokemon == null) {
            return res.status(404).json({ message: 'Pokemon no encontrado' });
        }

        return res.json(presentPokemon(pokemon))
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export async function createPokemon(req, res) {
    let errors = []
    if (req.body.name === null || req.body.name === undefined) {
        errors.push("name can't be null")
    }

    if (req.body.type === null || req.body.type === undefined) {
        errors.push("type can't be null")
    }

    if (!Object.keys(PokemonType).includes(req.body.type)) {
        errors.push(`type ${req.body.type} is invalid`)
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: errors.join('; ') })
    }

    try {
        const newPokemon = await doCreatePokemon(req.body);
        res.status(201).json(presentPokemon(newPokemon));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function deletePokemon(req, res) {
    try {
        const id = req.params.id;
        await doDeletePokemon(id);

        return res.json({ message: 'Pokemon deleted with success' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}