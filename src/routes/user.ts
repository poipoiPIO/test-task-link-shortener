import { Router } from 'express';

const router = Router();

import { registerUser, loginUser, getUserHistory } from '../controllers/user';
import { registerValidation } from '../middleware/register-validation';
import { loginValidation } from '../middleware/login-validation';
import { verify } from '../middleware/verify-token';

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.get('/user-history', verify, getUserHistory);

export default router;
