import React, { useState, useContext, useEffect } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import axios from 'axios';

const UpdatePokemon = () => {
    const { selectedPokemon } = useContext(PokemonContext);

    const [formData, setFormData] = useState({
        name: '',
        type: 'Agua',
        image_url: '',
    });

    useEffect(() => {
        if (selectedPokemon) {
            console.log(selectedPokemon.name);
            setFormData({
                name: selectedPokemon.name || '',
                type: selectedPokemon.type || '',
                image_url: selectedPokemon.image_url || '',
            });
        }
    }, [selectedPokemon]);

    const baseURL = 'http://localhost:3001';
    const tiposEspeciePokemon = ['Agua', 'Electrico', 'Fuego', 'Acero', 'Normal'];

    const updatePokemon = async (id, pokemonData) => {
        try {
            await axios.put(`${baseURL}/pokemon/${id}`, pokemonData);
            redirectTo('/');

        } catch (error) {
            console.error('Error al actualizar el Pokémon:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedPokemon) {
            console.error('No se ha seleccionado ningún Pokémon para editar.');
            return;
        }
        console.log(formData.image_url); 
        updatePokemon(selectedPokemon.id, formData);
    };
    const redirectTo = (path) => {
        window.location.href = path;
    };
    const handleCancel = () => {
        redirectTo('/');
    };

    return (
        <form className="update-pokemon-form" onSubmit={handleSubmit}>
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
            <button type="submit" className="form-submit-btn">
                Guardar cambios
            </button>
            <button type="button" onClick={handleCancel} className="form-cancel-btn">
                Volver
            </button>
        </form>
    );
};

export default UpdatePokemon;
