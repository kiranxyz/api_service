import { Router } from 'express';
import { startBattle, getBattle, performMove } from '../controllers/battleController.ts';
import { validateZod } from '#middlewares';
import { startBattleSchemaZod } from '#schemas';

const battleRouter = Router();

battleRouter.post('/start', validateZod(startBattleSchemaZod), startBattle);

battleRouter.get('/:id', getBattle);

console.log('in ');
battleRouter.post('/move', performMove);

export default battleRouter;
