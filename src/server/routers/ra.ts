import { Response, Router} from "express";

import { raController } from "../controllers/raController";

class RaRouter{
    public router: Router= Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get("", raController.getRa);
        this.router.post("", raController.addRa);
        this.router.put("", raController.updateRa);
    }
}
const RaRoutes = new RaRouter();
export default RaRoutes.router;