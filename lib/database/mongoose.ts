
import mongoose, {Mongoose} from "mongoose";


const MONGODB_URL = process.env.MONGODB_URL!;

interface MongooseConnection {
    connection: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = {
        connection: null,
        promise: null
    };
}

export const connectToDatabase = async () => {
    if (cached.connection) {
        return cached.connection;
    }

    if (!MONGODB_URL) throw new Error("MONGODB_URL env variable is not defined");

    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName: "BildWerker",
        bufferCommands: false,
    }) as Promise<Mongoose> ;

    if(cached.promise) {
        cached.connection = await (cached.promise) as Mongoose | null;
    }


    return cached.connection;

}