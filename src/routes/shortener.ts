import { Router } from 'express';
const router = Router();

import { getLinkController } from '../controllers/link/link';
import { provideRedis } from '../middleware/redis-provider';

router.get('/:linkKey', provideRedis, getLinkController);

export default router;
