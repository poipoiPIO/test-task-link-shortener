import { Router } from 'express';

const router = Router();

import { registerUserController, loginUserController } from '../controllers/user/authorization';
import { getUserItemsController, postUserItemController } from '../controllers/user/user-items/user-items';
import { registerValidation } from '../middleware/register-validation';
import { loginValidation } from '../middleware/login-validation';
import { verify } from '../middleware/verify-token';
import { provideRedis } from '../middleware/redis-provider';

router.post('/register', registerValidation, registerUserController);
router.post('/login', loginValidation, loginUserController);

router.get('/links', verify, getUserItemsController);
router.post('/links', [verify, provideRedis], postUserItemController);

export default router;
