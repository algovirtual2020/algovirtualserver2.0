import mongoose, { Schema, model } from 'mongoose';
export interface RvModel extends mongoose.Document {
    user:Schema.Types.ObjectId,
    introduccion: Number,
    ejemplo1: Number,
    ejemplo2: Number,
    generalidadesDLD: Number
}
const RvModelSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required:[true, 'El campo user es necesario']
    },
    introduccion:{
        type: Number,
        default:0,
        required: [true, 'El campo introduccion es necesario']
    },
    ejemplo1:{
        type: Number,
        default:0,
        required: [true, 'El campo ejemplo1 es necesario']
    },
    ejemplo2:{
        type: Number,
        default:0,
        required: [true, 'El campo ejemplo2 es necesario']
    },
    generalidadesDLD:{
        type: Number,
        default:0,
        required: [true, 'El campo generalidadesDLD es necesario']
    }
});
export default model<RvModel>('RvModel', RvModelSchema);