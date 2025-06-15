// models/Bill.js
import mongoose,{Schema} from 'mongoose';

const billSchema = new Schema({
  owner:{type:Schema.Types.ObjectId, ref:"User" },
  type: { type: String, enum: ['electricity', 'gas'], required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  isPaid: { type: Boolean, default: false },
}, { timestamps: true });

export const Bill= mongoose.model('Bill', billSchema);
