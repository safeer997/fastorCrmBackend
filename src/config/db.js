import mongoose from 'mongoose';

export async function connectDb() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'FastorCrm',
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Error connecting to MongoDb : ', error);
    process.exit(1);
  }
}
