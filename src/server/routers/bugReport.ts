import { Response, Router} from "express";
import{ bugReportController} from "../controllers/bugReportController";

class BugReportRouter{
    public router: Router= Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.post("",bugReportController.addBugReport);
        this.router.put("",bugReportController.updateBugReport);
        this.router.get("",bugReportController.getBugReport);
        this.router.get("/all",bugReportController.getBugReports);

    }
}
const BugReport = new BugReportRouter();
export default BugReport.router;