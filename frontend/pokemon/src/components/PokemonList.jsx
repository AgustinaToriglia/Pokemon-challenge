
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext';
import { CardPokemon } from './CardPokemon';
import { Loader } from './Loader';

export const PokemonList = () => {
    const { allPokemons, loading, setSelectedPokemon } = useContext(PokemonContext);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="card-list-pokemon container">
                    {allPokemons.length ? (
                        <>
                            {allPokemons.map((pokemon) => (
                                <div key={pokemon.id} className="pokemon-item">
                                    <CardPokemon pokemon={pokemon} />
                                    <Link to={`/edit/${pokemon.id}`} onClick={() => setSelectedPokemon(pokemon)}>
                                        Editar
                                    </Link>
                                </div>
                            ))}
                        </>
                    ) : (
                        <p>No se encontraron Pokémon.</p>
                    )}
                </div>
            )}
        </>
    );
};


