import {Router} from 'express'
import { login, me, signup } from '../controllers/auth.js';
import { errorHandler } from '../errors/error-handler.js';
import authMiddleware from '../middlewares/auth.js';
const authRoutes=Router();

authRoutes.post('/signup', errorHandler(signup));
authRoutes.post('/login', errorHandler(login));
authRoutes.get('/me',[authMiddleware],errorHandler(me));

export default authRoutes

