import {Router} from 'express';
import { login, registration ,logout,verify} from '../Controllers/authcontroller.js';
const router = Router();

router.post('/register',registration);
router.post('/login',login);
router.get('/logout',logout);
router.get('/verify',verify);

export default router;