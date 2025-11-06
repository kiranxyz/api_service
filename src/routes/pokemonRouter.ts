import { Router } from 'express';
import { storePokemon, getPokemonByUserId } from '../controllers/pokemonController.ts';
import { validateZod } from '#middlewares';
import { storePokemonSchemaZod } from '#schemas';

const router = Router();

router.post('/store', validateZod(storePokemonSchemaZod), storePokemon);
console.log('in');
router.get('/:userId', getPokemonByUserId);

export default router;
