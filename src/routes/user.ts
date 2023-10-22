import { Router } from 'express';

const router = Router();

import { registerUser, loginUser } from '../controllers/user/authorization';
import { getUserItems, postUserItem } from '../controllers/user/user-items';
import { registerValidation } from '../middleware/register-validation';
import { loginValidation } from '../middleware/login-validation';
import { verify } from '../middleware/verify-token';
import { provideRedis } from '../middleware/redis-provider';

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);

router.get('/links', verify, getUserItems);
router.post('/links', [verify, provideRedis], postUserItem);

export default router;
