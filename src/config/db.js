import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        if (!process.env.MONGOURI) {
            throw new Error("MONGOURI environment variable is missing!");
        }
        await mongoose.connect(process.env.MONGOURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error in DB connection -->', error);
        process.exit(1); // Exit process if DB connection fails
    }
}

export default connectDb;