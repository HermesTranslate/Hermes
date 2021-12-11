import mongoose from 'mongoose';

export interface IAuto extends mongoose.Document {
  userId: string; 
  guildId: string;
  lang: string;
  premiumLang: string[];
};

export const AutoSchema = new mongoose.Schema({
  userId: {type:String, required: true},
  guildId: {type:String, required: true},
  lang: {type:String, required: false},
  premiumLang: {type:[String], required: false},


}, { collection: 'auto', versionKey: false });

export const Auto = mongoose.model<IAuto>('Auto', AutoSchema);