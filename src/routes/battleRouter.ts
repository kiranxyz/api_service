import { Router } from 'express';
import { validateZod } from '#middlewares';
import { startBattle, playTurn, status } from '#controllers';
import { startBattleSchemaZod, playTurnSchemaZod } from '#schemas';
const battleRouter = Router();

battleRouter.route('/start').post(validateZod(startBattleSchemaZod), startBattle);

battleRouter.route('/turn/:battleId').post(validateZod(playTurnSchemaZod), playTurn);

battleRouter.route('/status/:battleId').get(status);

export default battleRouter;
