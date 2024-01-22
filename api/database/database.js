import mongoose from "mongoose";


const connectDatabase = async(url)=>{
    try {
        const connect = await mongoose.connect(url)
        console.log('Database Successfully connected')
    } catch (error) {
        console.log('Error in Database:',error)
    }
}

export default connectDatabase;  