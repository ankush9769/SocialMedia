import {Router} from 'express';
import { login, registration ,logout} from '../Controllers/authcontroller.js';
const router = Router();

router.post('/register',registration);
router.post('/login',login);
router.get('/logout',logout);

export default router;