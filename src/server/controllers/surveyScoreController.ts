import scoreModel from "../models/surveyScoreModel";
import { Request, Response } from "express";

class SurveyScoreController {

  public addScore(req: Request, res: Response) {
    let body = req.body;
    let score = new scoreModel({
      user: body.user,
      scoreList: JSON.parse(req.body.scoreList)
    });

    score.save((err, scoreDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        score: scoreDB,
      });
    });
  }
  public getScore(req: Request, res: Response) {
    let id = req.params.id;


    scoreModel.find()
      .where('user').equals(id)
      .exec((err, scoreDB:any) => {
        
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if ( Object.keys(scoreDB).length === 0) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'There is no record with this id'
          }
        })
      }
    
      res.json({
        ok: true,
        score: scoreDB[0].scoreList
      });

    });
  }
}

export const surveyScoreController = new SurveyScoreController();