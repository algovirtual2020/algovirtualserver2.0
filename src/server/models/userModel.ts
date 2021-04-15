import mongoose, { Schema, model } from 'mongoose';
import uniquevalidator from 'mongoose-unique-validator';

export interface User extends mongoose.Document {
  email: string,
  password: string,
  state: boolean,
};

let rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol válido'
}

const UserSchema = new Schema({

  
  email: {
    type: String,
    required: [true, 'El email es necesario'],
    unique:true
  },
  password: {
    type: String,
    required:[true, 'La contraseña es necesaria']
  },
  state: {
    type: Boolean,
    default: true
  }

});

UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
}

UserSchema.plugin( uniquevalidator, { message: '{PATH} debe ser unico' });


export default model<User>('User', UserSchema);
