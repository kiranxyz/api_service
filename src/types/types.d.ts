import { z } from 'zod/v4';

export type StartBattleInput = z.infer<typeof startBattleSchema>;
export type PlayerInput = z.infer<typeof playerSchemaZod>;
