import { useEffect, useState } from 'react';
import { useForm } from '../hook/useForm';
import { PokemonContext } from './PokemonContext';

export const PokemonProvider = ({ children }) => {

    const [allPokemons, setAllPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const { valueSearch, onInputChange, onResetForm } = useForm({
        valueSearch: '',
    });

    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(false);

    const getAllPokemons = async (limit = 50) => {
        const baseURL = 'http://localhost:3001/';
        const res = await fetch(`${baseURL}pokemon?page_size=${limit}`);
        const data = await res.json();
        console.log('Data from API:', data);

        let results = []; 

        if (data.pokemons) {
            try {
                for (const pokemon of data.pokemons) {
                    const res = await fetch(pokemon.url);
                    console.log('Pokemon data:', data); 
                    results.push(pokemon);
                }
            } catch (error) {
                console.error('Error fetching pokemon:', error);
            }
        }

        console.log('Results:', results);

        const filteredResults = results.filter((pokemon) => pokemon !== null);
        setAllPokemons([...allPokemons, ...filteredResults]);
        setLoading(false);
    };

    const getPokemonByID = async id => {
        const baseURL = 'http://localhost:3001/';

        const res = await fetch(`${baseURL}pokemon/${id}`);
        const data = await res.json();
        return data;
    };

    useEffect(() => {
        getAllPokemons();
    }, []);


    const [filteredPokemons, setfilteredPokemons] = useState([]);

    const handleCheckbox = e => {
        setTypeSelected({
            ...typeSelected,
            [e.target.name]: e.target.checked,
        });

        if (e.target.checked) {
            const filteredResults = globalPokemons.filter(pokemon =>
                pokemon.types
                    .map(type => type.type.name)
                    .includes(e.target.name)
            );
            setAllPokemons([...filteredPokemons, ...filteredResults]);
        } else {
            const filteredResults = filteredPokemons.filter(
                pokemon =>
                    !pokemon.types
                        .map(type => type.type.name)
                        .includes(e.target.name)
            );
            setfilteredPokemons([...filteredResults]);
        }
    };

    return (
        <PokemonContext.Provider
            value={{
                valueSearch,
                onInputChange,
                onResetForm,
                allPokemons,
                getPokemonByID,
                setAllPokemons,
                loading,
                setLoading,
                active,
                setActive,
                handleCheckbox,
                filteredPokemons,
                selectedPokemon,
                setSelectedPokemon,
            }}
        >
            {children}
        </PokemonContext.Provider>
    );
};