import { Response, Router} from "express";
import { progressController } from "../controllers/progressController";

//const validator = require ("../middleware/validations");

class ProgressRouter {
    public router: Router = Router();
    
    constructor(){
        this.config();
    }

    config():void {
        this.router.post("", progressController.addProgress);
        this.router.get("/rascore/:user", progressController.getProgressLearning);
    }

}
const ProgressRoutes = new ProgressRouter();
export default ProgressRoutes.router;