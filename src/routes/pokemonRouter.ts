import { Router } from 'express';
import { storePokemon, getPokemonByUserId } from '../controllers/pokemonController.ts';
import { validateZod } from '#middlewares';
import { storePokemonSchemaZod, userIdParamSchemaZod } from '#schemas';

const router = Router();

router.post('/store', validateZod(storePokemonSchemaZod), storePokemon);
router.get('/:userId', validateZod(userIdParamSchemaZod), getPokemonByUserId);

export default router;
