import { Router } from 'express';
import userRoutes from './usuario';
import loginRoutes from './login';
import scoreRoutes from './score';
import progressRoutes from './progress';
import raRoutes from './ra';
import rvRoutes from './rv';
import bugReport from './bugReport';
const router: Router = Router();

//=================================
//Url (http://localhost:3000/api/)
//=================================

//=================================
//router user
//=================================
router.use('/user', userRoutes);
//=================================
//router login
//=================================
router.use('/login', loginRoutes);
//=================================
//router score
//=================================
router.use('/score', scoreRoutes);

//router progress
router.use('/progress', progressRoutes);

router.use('/ra', raRoutes);

router.use('/rv', rvRoutes);

router.use('/bugreport', bugReport);


export default router;

