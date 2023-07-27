import React, { useState, useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import axios from 'axios';

const AddPokemon = () => {
    const {
        updatePokemon,
        selectedPokemon,
        clearSelectedPokemon,
        allPokemons,
        setAllPokemons,
    } = useContext(PokemonContext);

    const initialState = selectedPokemon || {
        name: '',
        type: 'Agua',
        image_url: '',
    };

    const baseURL = 'http://localhost:3001/';
    const tiposEspeciePokemon = ['Agua', 'Electrico', 'Fuego', 'Acero', 'Normal'];

    const [formData, setFormData] = useState(initialState);

    const addPokemon = async (pokemonData) => {
        try {
            const response = await axios.post('http://localhost:3001/pokemon', pokemonData);
            setAllPokemons([...allPokemons, response.data]);
            setFormData({
                name: '',
                type: 'Agua',
                image_url: '',
            });
            redirectTo('/');
        } catch (error) {
            console.error('Error al crear el Pokémon:', error);
        }
    };
    const redirectTo = (path) => {
        window.location.href = path; 
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedPokemon) {
            try {
                await axios.put(`/pokemon${selectedPokemon.id}`, formData);
                clearSelectedPokemon();
            } catch (error) {
                console.error('Error al actualizar el Pokémon:', error);
            }
        } else {
            addPokemon(formData);
        }
    };

    return (
        <form className="add-pokemon-form" onSubmit={handleSubmit}>
            <label>
                Nombre del Pokémon:
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                />
            </label>
            <br />
            <label>
                Tipo de especie:
                <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="form-select"
                >
                    {tiposEspeciePokemon.map((tipo) => (
                        <option key={tipo} value={tipo}>
                            {tipo}
                        </option>
                    ))}
                </select>
            </label>

            <br />
            <label>
            URL de la imagen (opcional):
                <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="form-input"
                />
            </label>
            <br />
            <button type="submit" className="form-submit-btn">
                {selectedPokemon ? 'Guardar cambios' : 'Crear Pokémon'}
            </button>
            {selectedPokemon && (
                <button type="button" onClick={clearSelectedPokemon} className="form-cancel-btn">
                    Cancelar
                </button>
            )}
        </form>
    );
};

export default AddPokemon;
