import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });

        console.log(`\n MongoDB connected! DB host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("❌ MONGODB connection failed:", error.message);
        process.exit(1); // Exit with failure
    }
};

export default connectDB;
