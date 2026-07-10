import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};
