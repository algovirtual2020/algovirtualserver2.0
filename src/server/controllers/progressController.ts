import progressModel from "../models/progressModel";
import surveyScore from "../models/surveyScoreModel";
import raModel, { RaModel } from "../models/raModel";
import rvModel from "../models/rvModel";
import { Progress} from "../models/progressModel";
import { Request, Response } from "express";
import { body } from "express-validator";
import { any } from "underscore";
import { json } from "body-parser";

class ProgressController {

    public async addProgress  (req: Request, res: Response){
        let body = req.body;
        let progress:Progress = new progressModel();

        try {
            progress.user= body.user
        } catch (err) {
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }
        }
       
        progress.surveyCount = await  surveyScore.countDocuments({user:body.user});
        if(req.body.rvScore){
            progress.rvScore = JSON.parse(req.body.rvScore)
        }
        if(req.body.raScore){
            progress.raScore= JSON.parse(req.body.raScore)
        }

        progress.save((err, progressDB)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err,
                });
            }
            res.json({
                ok:true,
                progress: progressDB,
                a: progress.surveyCount
            });
        });
    }

    public async getProgressLearning( req:Request, res:Response ){

        let porcentajeTotal:number=0; 
        let variable = 'getRaScore.reto';
        try {
            let u:any= req.params.user
            let getRaScore:any= await raModel.findOne({'user': u});
            var scoreChallenge:any = {};
            

            for (let i=1; i<=13; i++){
                let porcentajeReto: number =0
                if(eval(variable+i+'.attempsCorrect')> 0 || eval(variable+i+'.attempsIncorrect')>0){

                    let totalIntentos:number = eval(variable+i+'.attempsCorrect')+ eval(variable+i+'.attempsIncorrect');
                    porcentajeReto=  eval(variable+i+'.attempsCorrect')/totalIntentos*100;
                }
                porcentajeTotal=porcentajeTotal+porcentajeReto;
                scoreChallenge["reto"+i]=  porcentajeReto;
            }
            porcentajeTotal = porcentajeTotal/13

            
            res.json({
                ok:true,
                score: porcentajeTotal,
                scoreChallenge
            })
        } catch (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        
    }
}
export const progressController = new ProgressController();