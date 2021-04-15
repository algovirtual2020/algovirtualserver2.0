import {Request, Response} from 'express';
import userModel from '../models/userModel';
import raModel from '../models/raModel';
import rvModel from '../models/rvModel';

import bcrypt from 'bcrypt';
import _ from 'underscore';



class UserController {


  public getUser(req: Request, res: Response) {
    let id = req.params.id;


    userModel.find()
      .where('_id').equals(id)
      .where('state').equals(true)
      .exec((err, userDB) => {
        
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if ( Object.keys(userDB).length === 0) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'There is no active user with this id'
          }
        })
      }
    
      res.json({
        ok: true,
        user: userDB
      });

    });
  }

  public getAllUsers(req: Request, res: Response) {

    let from = req.query.from || 0;
    from = Number(from);
    
    let limit = req.query.limit || 100;
    limit = Number(limit);
    
    userModel.find({ state: true }, ' email ')
      .skip(from)
      .limit(limit)
      .exec((err, users) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err
          });
        }

        userModel.countDocuments({ state: true })
          .exec((err, count) => {
          res.json({
            ok: true,
            users,
            totalUsers: count,
            from,
            limit
          });
        });

      });
  }

  public async addUser(req: Request, res: Response) {
    
    let body = req.body;
    
    let user = new userModel({
      email: body.email,
      password: bcrypt.hashSync(body.password, 10 ),
    });
    
     await user.save((err, userDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      var thisClass = new UserController();
      var rv =  thisClass.addRv(userDB.id);
      var ra =  thisClass.addRa(userDB.id);
      if(!rv || ! ra){
        userModel.deleteOne({id:userDB.id});
        return res.status(400).json({
          ok: false,
          err
        });
      }
      //thisClass.addRv(res, userDB.id);
      res.json({
        ok: true,
        user: userDB
      });
    });

    
    //this.addRv(req, res, userdb.id);

    

  }
  

  public updateUser(req: Request, res: Response) {

    const id: string = req.params.id;
    
    let body = _.pick(req.body, ['name', 'img', 'role', 'state']);

    userModel.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
      
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        user: userDB
      })

    })

  }
 
  public deleteUser(req:Request, res:Response) {
    
    const id: string = req.params.id;

    let body = { state: false };
    

    userModel.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
      
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        message: 'User Delete_1',
        user: userDB

        //================
        //NOTAS:
        //Delete_1 se cambio simplemente de estado
        //Delete_0 se elimina completamente la Db
        //================
      });

    });
  } 
  public Test(req: Request, res: Response) {
    const id: String = req.params.id;
    
    res.json({
      ok: true,
      id,
      message: 'Todo esta bien'
    });
  }

  
  
  private async addRa (userId:any): Promise<Boolean>{

    let ra= new raModel();
    try{
        let user = await userModel.find().where("_id").equals(userId).exec();
        if(user.length===0){
            return false;
        }

        let raUser = await raModel.find().where("user").equals(userId).exec();

        if(raUser.length > 0){
            return false;
        }
        ra.user= userId;
        ra.save((err)=>{
            if(err){
                return false;
            }
            
            return true;
        });
    }catch(err){
        return false;
    }
    return true;
}

public async addRv( userId:any):Promise<Boolean>{
  let rv = new rvModel();
  try {
      
      let user = await userModel.find().where("_id").equals(userId).exec();
      if(user.length===0){
          return false;
      }

      let raUser = await rvModel.find().where("user").equals(userId).exec();

      if(raUser.length > 0){
          return false;
      }

      rv.user =userId;
      rv.save((err)=>{
          if(err){
              return false
          }
          return true;
      });


  } catch (err) {
      return false;
  }
  return true;
}



}


export const userController = new UserController();