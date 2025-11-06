import { Router } from 'express';
import { storePokemon, getPokemonByUserId } from '../controllers/pokemonController.ts';
import { validateZod } from '#middlewares';
import { storePokemonSchemaZod } from '#schemas';

const pokemonRouter = Router();

pokemonRouter.post('/store', validateZod(storePokemonSchemaZod), storePokemon);
pokemonRouter.get('/:userId', getPokemonByUserId);

export default pokemonRouter;
