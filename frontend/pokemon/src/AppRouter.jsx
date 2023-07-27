import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage, PokemonPage, SearchPage } from './pages';
import AddPokemon from "./components/AddPokemon";
import UpdatePokemon from "./components/UpdatePokemon";

export const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<HomePage />} />
				<Route path='pokemon/:id' element={<PokemonPage />} />
				<Route path='search' element={<SearchPage />} />
				<Route path='create' element={<AddPokemon/>}/>
				<Route path='edit/:id' element={<UpdatePokemon/>}/>
			</Route>

            <Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};