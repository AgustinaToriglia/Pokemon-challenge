import express from 'express';
import { getPokemon, searchPokemons, createPokemon, updatePokemon, deletePokemon } from '../controllers/controllers.mjs'

const router = express.Router();

router.get('/pokemon/:id', getPokemon);
router.get('/pokemon', searchPokemons);
router.post('/pokemon', createPokemon);
router.put('/pokemon/:id', updatePokemon);
router.delete('/pokemon/:id', deletePokemon);

export default router;
