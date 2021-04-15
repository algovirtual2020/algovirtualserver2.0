import { Router } from 'express';
import { loginController} from '../controllers/loginController';
const  validations = require('../middlewares/validations');


class Login {
  public router: Router = Router();
  
  constructor() {
    this.config();
  }
  private config(): void{

    this.router.post('',validations.userValidation(), loginController.login);
  
  }

}
const login = new Login();
export default login.router;