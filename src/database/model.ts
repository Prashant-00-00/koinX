import mongoose, { Schema, Document } from 'mongoose';

interface ICryptoPrice extends Document {
  name: string;
  price: number;
  marketCap: number;
  change24h: number;
  timestamp?: Date;
}

const cryptoPriceSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const CryptoPrice = mongoose.model<ICryptoPrice>('CryptoPrice', cryptoPriceSchema);
export default CryptoPrice;
