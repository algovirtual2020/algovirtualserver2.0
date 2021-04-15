import rvModel from '../models/rvModel';
import userModel from '../models/userModel'
import {Request, Response} from 'express';

class RvController{

    public async getRv(req:Request, res:Response){
        let id = req.body.user;
        
        try {
            
            await rvModel.find()
            .where("user").equals(id)
            .exec((err, rvDB)=>{
                if(err){
                    return res.status(500).json({
                        ok:err,
                        err
                    });
                }
                
                if ( Object.keys(rvDB).length === 0) {
                    return res.status(400).json({
                      ok: false,
                      err: {
                        message: 'no hay ningun registro de rv en la base de datos'
                      }
                    })
                  }
    
                  res.json({
                    ok: true,
                    rv: rvDB
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
    public async addRv(req: Request, res: Response){
        let rv = new rvModel();
        try {
            
            let user = await userModel.find().where("_id").equals(req.body.user).exec();
            if(user.length===0){
                return res.status(500).json({
                    ok:false,
                    err:{
                        message: "el usuario con el id: "+ req.body.user+" no existe",
                    }
                });
            }
    
            let raUser = await rvModel.find().where("user").equals(req.body.user).exec();
    
            if(raUser.length > 0){
                return res.status(500).json({
                    ok:false,
                    err:{
                        message: "ya existe un registro de rv para el useruario: "+ req.body.user,
                    }
                });
            }

            rv.user =req.body.user;
            rv.save((err, rvDB)=>{
                if(err){
                    return res.status(500).json({
                        ok:false,
                        err,
                    });
                }
                res.json({
                    ok:true,
                    ra:rvDB,
                });
            });


        } catch (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
    }

    public async updateRv(req:Request, res:Response){
        try {
            let rvScoreDb:any= await rvModel.findOne({'user':req.body.user});
            var chapter = req.body.chapter;
            switch (chapter) {
                case 'introduccion':
                    rvScoreDb.introduccion= rvScoreDb.introduccion+1;
                    break;
                case 'ejemplo1':
                    rvScoreDb.ejemplo1= rvScoreDb.ejemplo1+1;
                    break;
                case 'ejemplo2':
                    rvScoreDb.ejemplo2= rvScoreDb.ejemplo2+1;
                    break;
                case 'generalidadesDLD':
                    rvScoreDb.generalidadesDLD= rvScoreDb.generalidadesDLD+1;
                    break;
                default:
                    res.status(500).json({
                        ok:false, 
                        message:'Recuerde que el campo chapter solo puede ser: introduccion, ejemplo1, ejemplo2, generalidadesDLD'
                    });
                    break;
            }

            let rvScoreUpdate = await rvScoreDb.save();
            res.json({
                ok:true,
                message:'score rv actualizado correctamente',
                rvScoreUpdate
            });

        } catch (err) {
            return res.status(500).json({
                ok:false,
                err,
            });
        }
    }
}
export const rvController = new RvController();