import { Response, Router} from "express";
import { rvController } from "../controllers/rvController";

class RvRouter{
    public router: Router=Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.get("",rvController.getRv);
        this.router.post("",rvController.addRv);
        this.router.put("",rvController.updateRv);
    }
}
const RvRoutes = new RvRouter();
export default RvRoutes.router;