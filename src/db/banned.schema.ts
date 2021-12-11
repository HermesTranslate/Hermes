import mongoose from 'mongoose';

export interface IBanned extends mongoose.Document {
  _id: string; 
  reason: string;
};

export const BannedSchema = new mongoose.Schema({
  _id: {type:String, required: true},
  reason: {type:String, required: false}
}, { collection: 'banned', versionKey: false });

export const Banned = mongoose.model<IBanned>('Banned', BannedSchema);