import React from 'react';

export const CardPokemon = ({ pokemon }) => {
    return (
        <>
            <div className='card-img'>
                {pokemon.image_url ? (
                    <img
                        src={pokemon.image_url}
                        alt={`Pokemon ${pokemon.name}`}
                    />
                ) : (
                    <p>No hay imagen disponible</p>
                )}
            </div>
            <div className='card-info'>
                <h3>{pokemon.name}</h3>
                <p className='pokemon-id'>Tipo: {pokemon.type}</p>
                <div className='card-types'>
                    {pokemon.types && pokemon.types.map(type => (
                        <span key={type.type.name} className={type.type.name}>
                            {type.type.name}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
};
