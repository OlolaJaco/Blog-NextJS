import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let isConnected = false; // Track connection status

async function connectToDatabase() {
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        if (!uri) {
            throw new Error('MONGODB_URI is not defined');
        }
        const connection = await mongoose.connect(uri, {});
        isConnected = connection.connections[0].readyState === 1;
        console.log('Connected to MongoDB with Mongoose');
    } catch (error) {
        console.error('Error connecting to MongoDB with Mongoose:', error);
        throw new Error('Database connection failed');
    }
}

export default connectToDatabase;