import mongoose, {Schema, model} from 'mongoose';
export interface Progress extends mongoose.Document {
    user:Schema.Types.ObjectId,
    date: Date,
    surveyCount: number;
    rvScore: Array<number>;
    raScore: Array<number>;
}

const ProgressSchema = new Schema ({
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:[true, 'El campo user es necesario']
    },
    date: {
        type: Date,
        default: new Date()
    },
    surveyCount: {
        type: Number,
        default: 0,
        required:[true, 'El campo score es necesario']
    },
    rvScore: {
        type: Array<number>(),
        default: [0,0,0,0],
        required:[true, 'El campo score es necesario']
    },
    raScore:{
        type: Array<number>(),
        default: [0,0,0,0,0,0,0,0,0,0,0,0,0],
        required:[true, 'El campo score es necesario']
    }
});

export default model<Progress>('Progress', ProgressSchema);
