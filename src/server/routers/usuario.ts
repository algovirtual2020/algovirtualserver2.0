import { Response,Router } from 'express';
import { userController } from '../controllers/userController';
import { auth } from '../middlewares/auth';
const  validations = require('../middlewares/validations');
class UserRouter{

  public router: Router = Router();


  constructor() {
    this.config();
  }

  config(): void{
    this.router.get('/:id', userController.getUser);
    this.router.get('', userController.getAllUsers);
    this.router.post('',validations.userValidation(), userController.addUser);
    this.router.put('/:id', userController.updateUser);
    this.router.delete('/:id', userController.deleteUser);
  }
}
const userRoutes = new UserRouter();
export default userRoutes.router;
