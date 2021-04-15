import mongoose,{Schema, model} from 'mongoose';

export interface BugReportModel extends mongoose.Document {
    user:Schema.Types.ObjectId,
    message: String,
    date: Date,
    active: Boolean,
};

const BugReportSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required:[true, 'El campo user es necesario']
    },
    message: {
        type:String,
        required:[true, 'El campo message no puede estar vacio']
    },
    date:{
        type:Date,
        default:new Date()
    },
    active:{
        type:Boolean,
        default:true
    }
});

export default model<BugReportModel>('BugReport', BugReportSchema);
