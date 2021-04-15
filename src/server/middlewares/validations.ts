import { response, NextFunction, ErrorRequestHandler } from "express";

import { body, validationResult } from "express-validator";
import bodyParser from 'body-parser';

//=================================================
//user body validations
//=================================================

const userValidation = () => {
  return [
    // username must be an email
    body("email").isEmail().withMessage('El email debe ser de tipo email'),
    // password must be at least 5 chars long
    body("password").isLength({ min: 3 }).withMessage('La contraseña debe tener por lo menos 3 caracteres'),

    getErros
  ];
};

//=================================================
//Get erros body
//=================================================

const getErros = (req = response, res = response, next: NextFunction) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      err: {
        message: errores.array()[0].msg
      },
    });
  }
  next();
};

module.exports = {
  userValidation,
};
