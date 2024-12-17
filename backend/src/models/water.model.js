import {model,Schema} from 'mongoose';

export const WaterSchema = new Schema (
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        origins: {type: [String] , required:true},
        stars: { type: Number, default: 0 },
        imageUrl: { type: String, required: true },
        description: { type: String, required: true },
    },
    {
        timestamps:true,
        toJSON:{
            virtuals:true,
        },
        toObject:{
            virtuals:true,
        },
    }
);

export const WaterModel = model('water', WaterSchema);