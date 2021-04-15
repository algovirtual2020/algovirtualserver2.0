import { Response, Router } from "express";
import { surveyScoreController } from "../controllers/surveyScoreController";

const validations = require("../middlewares/validations");
class ScoreRouter {
  public router: Router = Router();
  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("", surveyScoreController.addScore);
    this.router.get("/:id", surveyScoreController.getScore);
  }
}
const ScoreRoutes = new ScoreRouter();
export default ScoreRoutes.router;
