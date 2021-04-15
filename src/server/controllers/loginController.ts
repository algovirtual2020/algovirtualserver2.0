import bcrypt from 'bcrypt';
import userModel from '../models/userModel';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import {config} from '../config/config';


class LoginController {

  public login(req: Request, res: Response) {
    let body = req.body;
    

    userModel.findOne({ email: body.email }, (err, userDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if (!userDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'Wrong (email) or password '
          }
        });
      }

      if (!bcrypt.compareSync(body.password, userDB.password)) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Wrong email or (password)'
            }
        });
      }
      res.json({
        ok: true,
        user: userDB,
      });

    })
  }
}

export const loginController = new LoginController(); 