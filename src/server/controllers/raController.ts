import raModel from '../models/raModel';
import userModel from '../models/userModel'
import {Request, Response} from 'express';

class RaController {

    public async getRa(req:Request, res:Response){
        let id = req.body.user;
        
        try {
            
            await raModel.find()
            .where("user").equals(id)
            .exec((err, raDB)=>{
                if(err){
                    return res.status(500).json({
                        ok:err,
                        err
                    });
                }
                
                if ( Object.keys(raDB).length === 0) {
                    return res.status(400).json({
                      ok: false,
                      err: {
                        message: 'no hay ningun registro de ra en la base de datos'
                      }
                    })
                  }
    
                  res.json({
                    ok: true,
                    rv: raDB
                  })
            });
        } catch (err) {
            if(err){
                return res.status(500).json({
                    ok:err,
                    err
                });
            }
        }

    }


    public async addRa(req:Request, res:Response){
        let body = req.body;
        let ra= new raModel();
        try{

            let user = await userModel.find().where("_id").equals(body.user).exec();
            if(user.length===0){
                return res.status(500).json({
                    ok:false,
                    err:{
                        message: "el usuario con el id: "+ body.user+" no existe",
                    }
                });
            }
    
            let raUser = await raModel.find().where("user").equals(body.user).exec();
    
            if(raUser.length > 0){
                return res.status(500).json({
                    ok:false,
                    err:{
                        message: "ya existe un registro de ra para el useruario: "+ body.user,
                    }
                });
            }
    
            ra.user= body.user;
            ra.save((err, raDB)=>{
                if(err){
                    return res.status(500).json({
                        ok:false,
                        err,
                    });
                }
                res.json({
                    ok:true,
                    ra:raDB,
                });
            });
        }catch(err){
            return res.status(500).json({
                ok: false,
                err,
            });
        }
    }
    
    public async updateRa(req:Request, res:Response){
        let body = req.body;
        
        try{
            let raScoreDb:any= await raModel.findOne({'user':body.user});
            if(body.nReto){
                for (let i=1; i<=13; i++){
                    if(body.nReto==i){
                        
                        var variable='raScoreDb.reto';
                        
                        if(req.body.correct==='true'){
                            eval(variable+i+'.correct'+ ' = '+ true);
                            var x:number = eval(variable+i+'.attempsCorrect')+1;
                            eval(variable+i+'.attempsCorrect'+'='+ x);
                        }else{
                            eval(variable+i+'.correct'+ ' = '+ false);
                            var y:number = eval(variable+i+'.attempsIncorrect')+1;
                            eval(variable+i+'.attempsIncorrect'+'='+ y);
                        }
                    }
                };
            }

            let raScoreUpdated = await raScoreDb.save();
            res.json({
                ok:true,
                message:'score ra actualizado correctamente',
                raScoreUpdated
            });

        }catch(err){
            return res.status(500).json({
                ok:false,
                err,
            });
        }
    }
}
export const raController = new RaController();