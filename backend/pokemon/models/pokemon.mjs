import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: false,
    },
});

export const presentPokemon = (model) => {
    return {
        id: model._id,
        name: model.name,
        type: model.type,
        image_url: model.image_url,
    }
}

export const Pokemon = mongoose.model('Pokemon', pokemonSchema);