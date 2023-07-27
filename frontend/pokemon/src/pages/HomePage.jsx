import React, { useContext } from 'react';
import {  PokemonList } from '../components';
import { PokemonContext } from '../context/PokemonContext';
import { Link } from 'react-router-dom';
export const HomePage = () => {

    // const {} = useContext(PokemonContext)

    return (
        <>  
            <div className="container-btn-load-more container">
                <Link to="/create" className='btn-load-more'>
                    Crear un Pokémon
                </Link>
            </div>
            <PokemonList />
        </>
    );
};