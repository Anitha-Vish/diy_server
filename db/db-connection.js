import mongoose from 'mongoose';



const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    console.log(connect.connection.db.databaseName);
    connect.connection.on('disconnect', () => {
    throw new Error(`Lost connection to MongoDB @ ${client.connection.host}`);
  });
  } catch (error) {
    // console.log('Connection error:',error.message);
	    console.error(error);
     process.exit();
  }
};

export default connectDB;