import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://prashant:RbZhgAXkd1YF9O9I@prashant-cluster.a3uiuae.mongodb.net/koinX");
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
