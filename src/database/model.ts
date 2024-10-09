import mongoose, { Schema, Document } from 'mongoose';

interface ICryptoPrice extends Document {
  name: string;
  price: number;
  marketCap: number;
  change24h: number;
}

const cryptoPriceSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true }
});

const CryptoPrice = mongoose.model<ICryptoPrice>('CryptoPrice', cryptoPriceSchema);
export default CryptoPrice;
