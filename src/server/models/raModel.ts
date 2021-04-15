import mongoose, { Schema, model } from 'mongoose';

export interface RaModel extends mongoose.Document {
    user:Schema.Types.ObjectId,
    reto1: retos,
    reto2: retos,
    reto3: retos,
    reto4: retos,
    reto5: retos,
    reto6: retos,
    reto7: retos,
    reto8: retos,
    reto9: retos,
    reto10: retos,
    reto11: retos,
    reto12: retos,
    reto13: retos,
};
export interface retos
{
    correct:boolean,
    attempsCorrect:number,
    attempsIncorrect:number
}
 
const RaModelSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required:[true, 'El campo user es necesario']
    },

    reto1:{
        correct:{
            type: Boolean,
            default: false
        },
        attempsCorrect:{
            type: Number,
            default: 0
        },
        attempsIncorrect:{
            type: Number,
            default: 0
        }
    },
    reto2:{
        correct:{
            type: Boolean,
            default: false
        },
        attempsCorrect:{
            type: Number,
            default: 0
        },
        attempsIncorrect:{
            type: Number,
            default: 0
        }
    },
    reto3:{
        correct:{
            type: Boolean,
            default: false
        },
        attempsCorrect:{
            type: Number,
            default: 0
        },
        attempsIncorrect:{
            type: Number,
            default: 0
        }
    },
    reto4:{
        correct:{
            type: Boolean,
            default: false
        },
        attempsCorrect:{
            type: Number,
            default: 0
        },
        attempsIncorrect:{
            type: Number,
            default: 0
        }
    },
    reto5:{
        correct:{
            type: Boolean,
            default: false
        },
        attempsCorrect:{
            type: Number,
            default: 0
        },
        attempsIncorrect:{
            type: Number,
            default: 0
        }
    },
    reto6:{
        correct:{
            type: Boolean,
            default: false
        },
        attempsCorrect:{
            type: Number,
            default: 0
        },
        attempsIncorrect:{
            type: Number,
            default: 0
        }
    },
    reto7:{
        correct:{
            type: Boolean,
            default: false
        },
        attempsCorrect:{
            type: Number,
            default: 0
        },
        attempsIncorrect:{
            type: Number,
            default: 0
        }
    },
    reto8:{
        correct:{
            type: Boolean,
            default: false
        },
        attempsCorrect:{
            type: Number,
            default: 0
        },
        attempsIncorrect:{
            type: Number,
            default: 0
        }
    },
    reto9:{
        correct:{
            type: Boolean,
            default: false
        },
        attempsCorrect:{
            type: Number,
            default: 0
        },
        attempsIncorrect:{
            type: Number,
            default: 0
        }
    },
    reto10:{
        correct:{
            type: Boolean,
            default: false
        },
        attempsCorrect:{
            type: Number,
            default: 0
        },
        attempsIncorrect:{
            type: Number,
            default: 0
        }
    },
    reto11:{
        correct:{
            type: Boolean,
            default: false
        },
        attempsCorrect:{
            type: Number,
            default: 0
        },
        attempsIncorrect:{
            type: Number,
            default: 0
        }
    },
    reto12:{
        correct:{
            type: Boolean,
            default: false
        },
        attempsCorrect:{
            type: Number,
            default: 0
        },
        attempsIncorrect:{
            type: Number,
            default: 0
        }
    },
    reto13:{
        correct:{
            type: Boolean,
            default: false
        },
        attempsCorrect:{
            type: Number,
            default: 0
        },
        attempsIncorrect:{
            type: Number,
            default: 0
        }
    },
    
});

export default model<RaModel>('RaModel', RaModelSchema);