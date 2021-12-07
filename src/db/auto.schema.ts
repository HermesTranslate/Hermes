import mongoose from 'mongoose';

export interface IAuto extends mongoose.Document {
  userId: string; 
  guildId: string;
  lang: string;
};

export const AutoSchema = new mongoose.Schema({
  userId: {type:String, required: true},
  guildId: {type:String, required: true},
  lang: {type:String, required: true},

}, { collection: 'auto', versionKey: false });

export const Auto = mongoose.model<IAuto>('Auto', AutoSchema);